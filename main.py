from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId

# Create a Flask app instance
app = Flask(__name__)

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['discussion_board']
discussions_collection = db['discussions']

# API endpoints for discussions
@app.route('/discussions', methods=['GET'])
def get_discussions():
    # Retrieve all discussions from the database
    discussions = list(discussions_collection.find())
    # Return the discussions as a JSON object
    return jsonify(discussions)

@app.route('/discussions/<string:id>', methods=['GET'])
def get_discussion(id):
    # Retrieve a specific discussion by its ID
    discussion = discussions_collection.find_one({'_id': ObjectId(id)})
    if not discussion:
        # If the discussion is not found, return an error message and 404 status code
        return jsonify({'error': 'Discussion not found'}), 404
    # Return the discussion as a JSON object
    return jsonify(discussion)

@app.route('/discussions', methods=['POST'])
def create_discussion():
    # Retrieve the JSON data sent in the request
    data = request.get_json()
    # Create a new discussion with the given title and an empty list of comments
    new_discussion = {'title': data.get('title'), 'comments': []}
    # Insert the new discussion into the database and retrieve its ID
    result = discussions_collection.insert_one(new_discussion)
    # Add the ID to the discussion object and return it as a JSON object with 201 status code
    new_discussion['_id'] = str(result.inserted_id)
    return jsonify(new_discussion), 201

@app.route('/discussions/<string:id>/comments', methods=['POST'])
def create_comment(id):
    # Retrieve the JSON data sent in the request
    data = request.get_json()
    # Find the discussion with the given ID
    discussion = discussions_collection.find_one({'_id': ObjectId(id)})
    if not discussion:
        # If the discussion is not found, return an error message and 404 status code
        return jsonify({'error': 'Discussion not found'}), 404
    # Create a new comment with the given text
    new_comment = {'text': data.get('text')}
    # Add the new comment to the list of comments for the discussion
    discussions_collection.update_one({'_id': ObjectId(id)}, {'$push': {'comments': new_comment}})
    # Return the new comment as a JSON object with 201 status code
    return jsonify(new_comment), 201

@app.route('/discussions/<string:id>', methods=['DELETE'])
def delete_discussion(id):
    # Delete the discussion with the given ID from the database
    result = discussions_collection.delete_one({'_id': ObjectId(id)})
    if not result.deleted_count:
        # If the discussion is not found, return an error message and 404 status code
        return jsonify({'error': 'Discussion not found'}), 404
    # Return a success message as a JSON object
    return jsonify({'message': 'Discussion deleted successfully'})

@app.route('/discussions/<string:id>', methods=['PUT'])
def update_discussion(id):
    # Retrieve the JSON data sent in the request
    data = request.get_json()
    # Update the discussion with the given ID to have the new title
    result = discussions_collection.update_one({'_id': ObjectId(id)}, {'$set': {'title': data.get('title')}})
    if not result.modified_count:
        # If the discussion is not found or fails
        return jsonify({'error': 'Discussion not found or failed to update'}), 404
    return jsonify({'message': 'Discussion updated successfully'})

@app.route('/admin/discussions/<string:id>', methods=['DELETE'])
def delete_discussion_as_admin(id):
    # Authenticate the user as an admin
    if not is_admin(request):
        return jsonify({'error': 'Not authorized'}), 401

    # Delete the discussion with the given ID from the database
    result = discussions_collection.delete_one({'_id': ObjectId(id)})
    if not result.deleted_count:
        # If the discussion is not found, return an error message and 404 status code
        return jsonify({'error': 'Discussion not found'}), 404
    # Return a success message as a JSON object
    return jsonify({'message': 'Discussion deleted successfully'})

def is_admin(request):
    # Check if the request contains an authentication token or other means of identifying an admin user
    # Return True if the user is an admin, False otherwise
    # Example implementation:
    token = request.headers.get('Authorization')
    return token == 'admin_token'  # Replace with your own admin authentication logic

if __name__ == '__main__':
    app.run(debug=True)
