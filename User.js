const mongoose = require('mongoose');

/* practice of mongoose outer schema for another schema */
const adressSchema = new mongoose.Schema({
    street: {
        type: String,
        validate:{
            validator: function(v){
                return v.length > 0;
            },
            message: 'Street must be longer than 1 character'
        }
    },
    city: String,
})

/* actual schema */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: {
            validator: function(v){
                return v.length > 0;
            },
            message: 'Name must be longer than 1 character'
        }
        
    },
    completed: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        min: 0,
        max: 101,
        validate: {
            validator: function(v){
                return 101 > v > 0;
            },
            message: 'Age must be between 0 and 101'

        }
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        validate:{
            validator: function(v){
                return v != this._id;
            },
            message: 'Best friend must be different from user'
        }
    },
    hobbies: {
        type: [String],
        default: ['reading', 'writing', 'coding'],
        validate: {
            validator: function(v){
                return v.length > 0;
            },
            message: 'A user must have at least one hobby'
        }

    },
    adress: adressSchema,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true ,/* makes date unchangable to keep exact track. */

    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }

});


/* practice of methods */
userSchema.methods.myBestFriend = async function getBestFriend(){
    try{
        const user = await this.populate('bestFriend');
       console.log( `${this.bestFriend.name} is my best friend`);

    }catch(e){
        console.log(e);
    }
}

/* practice of statics */
userSchema.statics.findOneByName =  function findByName(name){
    return this.find({name: new RegExp(name, 'i')}).limit(1);
}

/* practice of queries */
userSchema.query.byName =  function findByName(name){
    return this.where({name: new RegExp(name, 'i')}).limit(1);
}

/* practice of virtuals */
userSchema.virtual('fullName').get(function(){
    return `${this.name}dasdds`;
})


/* practice of pre middleware */
userSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    this.createdAt = Date.now();
    next();
})

/*  practice of post middleware */
userSchema.post('save', function(doc, next){
    console.log('Saved', doc);
    next();
})

module.exports= mongoose.model('User', userSchema);