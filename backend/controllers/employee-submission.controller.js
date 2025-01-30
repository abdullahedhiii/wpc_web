
module.exports.addPersonalDetails = async (req,res) => {
   console.log('personal hit ',req.params.id,req.body);
   return res.status(200).json('hello');
}


module.exports.addServiceDetails = async (req,res) => {
    console.log('sevice hit ',req.params.id,req.body);
    return res.status(200).json('hello');

}

module.exports.addEducationalDetails = async (req,res) => {
    console.log('educational hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addJobDetails = async (req,res) => {
    console.log('job hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addKeyResponsibility = async (req,res) => {
    console.log('key hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addTrainingData = async (req,res) => {
    console.log('tra hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addKinData = async (req,res) => {
    console.log('kim hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addCertification = async (req,res) => {
    console.log('cert hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addContact = async (req,res) => {
    console.log('conta hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addPayDetails = async (req,res) => {
    console.log('pay hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addPayStructure = async (req,res) => {
    console.log('struc hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addPassport = async (req,res) => {
    console.log('passport hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addVisa = async (req,res) => {
    console.log('visa hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addEsus = async (req,res) => {
    console.log('esus hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.addDBS = async (req,res) => {
    console.log('dbs hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.add_other_details = async (req,res) => {
    console.log('other hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.national_data = async (req,res) => {
    console.log('na hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}

module.exports.add_other_document = async(req,res) => {
    console.log('other dod hit ',req.params.id,req.body);
    return res.status(200).json('hello');
}