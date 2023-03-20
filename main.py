from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['discussion_board']
discussions_collection = db['discussions']

# API endpoints for discussions
@app.route('/discussions', methods=['GET'])
def get_discussions():
    discussions = list(discussions_collection.find())
    return jsonify(discussions)

@app.route('/discussions/<string:id>', methods=['GET'])
def get_discussion(id):
    discussion = discussions_collection.find_one({'_id': ObjectId(id)})
    if not discussion:
        return jsonify({'error': 'Discussion not found'}), 404
    return jsonify(discussion)

@app.route('/discussions', methods=['POST'])
def create_discussion():
    data = request.get_json()
    new_discussion = {'title': data.get('title'), 'comments': []}
    result = discussions_collection.insert_one(new_discussion)
    new_discussion['_id'] = str(result.inserted_id)
    return jsonify(new_discussion), 201

@app.route('/discussions/<string:id>/comments', methods=['POST'])
def create_comment(id):
    data = request.get_json()
    discussion = discussions_collection.find_one({'_id': ObjectId(id)})
    if not discussion:
        return jsonify({'error': 'Discussion not found'}), 404
    new_comment = {'text': data.get('text')}
    discussions_collection.update_one({'_id': ObjectId(id)}, {'$push': {'comments': new_comment}})
    return jsonify(new_comment), 201

@app.route('/discussions/<string:id>', methods=['DELETE'])
def delete_discussion(id):
    result = discussions_collection.delete_one({'_id': ObjectId(id)})
    if not result.deleted_count:
        return jsonify({'error': 'Discussion not found'}), 404
    return jsonify({'message': 'Discussion deleted successfully'})

@app.route('/discussions/<string:id>', methods=['PUT'])
def update_discussion(id):
    data = request.get_json()
    result = discussions_collection.update_one({'_id': ObjectId(id)}, {'$set': {'title': data.get('title')}})
    if not result.modified_count:
        return jsonify({'error': 'Discussion not found or failed to update'}), 404
    return jsonify({'message': 'Discussion updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)
