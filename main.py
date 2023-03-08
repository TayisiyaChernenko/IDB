from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['discussion_board']
discussions_collection = db['discussions']

# API endpoint to get all discussions
@app.route('/discussions', methods=['GET'])
def get_discussions():
    discussions = list(discussions_collection.find())
    return jsonify(discussions)

# API endpoint to get a single discussion by ID
@app.route('/discussions/<string:id>', methods=['GET'])
def get_discussion(id):
    discussion = discussions_collection.find_one({'_id': ObjectId(id)})
    if not discussion:
        return jsonify({'error': 'Discussion not found'}), 404
    return jsonify(discussion)

# API endpoint to create a new discussion
@app.route('/discussions', methods=['POST'])
def create_discussion():
    data = request.get_json()
    new_discussion = {
        'title': data['title'],
        'comments': []
    }
    result = discussions_collection.insert_one(new_discussion)
    new_discussion['_id'] = str(result.inserted_id)
    return jsonify(new_discussion), 201

# API endpoint to create a new comment on a discussion
@app.route('/discussions/<string:id>/comments', methods=['POST'])
def create_comment(id):
    data = request.get_json()
    discussion = discussions_collection.find_one({'_id': ObjectId(id)})
    if not discussion:
        return jsonify({'error': 'Discussion not found'}), 404
    new_comment = {
        'text': data['text']
    }
    result = discussions_collection.update_one(
        {'_id': ObjectId(id)},
        {'$push': {'comments': new_comment}}
    )
    if not result.modified_count:
        return jsonify({'error': 'Failed to add comment'}), 500
    return jsonify(new_comment), 201

if __name__ == '__main__':
    app.run(debug=True)