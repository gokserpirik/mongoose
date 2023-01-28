const mongoose = require('mongoose');
const User = require('./User');

const mongourl = '';

mongoose.set('strictQuery', false);
mongoose.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected to DB");
}, e=>{
    console.log("Error connecting to DB");
}
);


async function createUser({nameof, completed, age, hobbies}){
   /* const user = await User.create({name: nameof, completed: completed, age: age}); */
   try{
    const user = new User({
        name: nameof,
        completed: completed,
        age: age,
        hobbies: hobbies,
        adress: {
            street: '123 Main St',
            city: 'New York'
        }
    });
    const result = await user.save();
    console.log(result);

   } catch(e){
         console.log(e);
    }

}

async function getUsers(){
    const users = await User.find();
    console.log(users);
}


async function getUserById({id}){
    try{
        const user = await User.findById(id);
        console.log(user || 'User not found');

    }catch(e){
        console.log(e);
    }
}

async function getUserByName({name}){
    try{

        const user = await User.find().byName(name); 
      /*   const user = await User.where().byName(name); */
        /* const user = await User.findOneByName(name); */
        console.log(user || 'User not found');

    }catch(e){
        console.log(e);
    }
}
async function getUserByFullName({name}){
    try{
        const user = await User.findOne({name:name});

        console.log(user.fullName);


    }catch(e){
        console.log(e);
    }
}




async function doesUserExists({name}){
    try{
        const user = await User.exists({name: name});
        console.log(user || 'User not found');
    }catch(e){
        console.log(e);
    }
}

async function addBestFriend({name, bestFriend}){
    try{
        const user = await User.findOne({name: name});
        const newuser = user.bestFriend = bestFriend;
        const update = await user.save()

        user.myBestFriend() /* gets bestFriend name */

    }catch(e){
        console.log(e);
    }
}

async function getBestFriend({name}){
    try{
        const user = await User.findOne({name: name}).populate('bestFriend');
        console.log(user.bestFriend);

    }catch(e){
        console.log(e);
    }
}


async function allRun(){
    await createUser({nameof: 'Adam', completed: true, age: 20, hobbies: ['reading', 'writing', 'coding']});

 console.log('---------------------');

await getUsers()

console.log('---------------------');

await getUserById({id: '63d4da70ab1064e6cadd0a02'})

console.log('---------------------');

await getUserByName({name: 'Adam'})

console.log('---------------------');

await getUserByFullName({name: 'Adam'})

console.log('---------------------');

await doesUserExists({name: 'Adam'})

console.log('---------------------');

await addBestFriend({name: 'Adam', bestFriend: '63d4da70ab1064e6cadd0a02'})

console.log('---------------------');

await getBestFriend({name: 'Adam'})

}

allRun();