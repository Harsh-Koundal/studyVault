import mongoose from 'mongoose'

const studyMaterialSchema = new mongoose.Schema({
    title:{type:String,required:true},
    subject:{type:String,required:true},
    description:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    date:{type:Date, default:Date.now},
    downloads:{type:Number,default:0},
    views:{type:Number,default:0},
    fileUrl:String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

},{timestamps:true});
export default mongoose.model("StudyMaterial",studyMaterialSchema);