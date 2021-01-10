import mongoose from 'mongoose';
// mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/companydb",{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex:true
})
.then(db=>console.log('db is connected'))
.catch(error=>console.log(error))