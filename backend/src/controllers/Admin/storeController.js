const {Store}=require('../../models');
const {Profile}=require('../../models');

const getStores= async (req, res,next) => {
    try {
        const stores = await Store.findAll({
            include: [
                {
                    model: Profile,
                    as: "profile"
                }
            ]
        });
        res.json(stores);
    } catch (error) {
        console.log(error);next(error);
    }
}

const getStore = async (req, res,next) => {
    try {
        const store = await Store.findByPk(req.params.storeId,{
            include: [
                {
                    model: Profile,
                    as: "profile"
                }
            ]
        });
        res.json(store);
    } catch (error) {
        console.log(error);next(error);
    }
}

const createStore = async (req, res,next) => {
    try {
        const store = await Store.create(req.body);
        if(store){
            if(req.file){
                const fileDetails = {
                    mediable_id: store.id,
                    mediable_type: 'Store',
                    url: `./uploads/storeMedia/${ req.file.filename }`,
                    name: req.file.originalname,
                    file_name: req.file.filename,
                    file_type: req.file.mimetype,
                    file_size: req.file.size,
                };
                await Profile.create(fileDetails);
            }
            return res.status(201).json({success: true, data: store, message: "Store created successfully"});
        }
        return res.status(400).json({success: false, message: "Store creation failed"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateStore = async (req, res,next) => {
    try {
        const store = await Store.findByPk(req.params.storeId);
        if (store) {
            await Store.update(req.body,{where:{
                id:req.params.storeId
            }});
            return res.status(200).json({success: true, old_data: store, message: "Store updated successfully",updated_data:req.body});
        } else {
            return res.status(404).json({success: false, message: "Store not found"});
        }
    } catch (error) {
        console.log(error);next(error);
    }
};

const deleteStore = async (req, res,next) => {
    try {
        const store = await Store.findByPk(req.params.storeId);
        if (store) {
            await store.destroy();
            res.json({message: "Store removed"});
        } else {
            res.status(404).json({error: "Store not found"});
        }
    } catch (error) {
        console.log(error);next(error);
    }
}

const changeStatus=async(req,res,next)=>{
    try {
        const store = await Store.findByPk(req.params.storeId);
        if (store) {
            store.status=req.body.status;
            await store.save();
            return res.status(200).json({success: true, old_data: store, message: "Store status updated successfully",updated_data:req.body});
        } else {
            return res.status(404).json({success: false, message: "Store not found"});
        }
    } catch (error) {
        console.log(error);next(error);
    }
}

module.exports = {
    getStores,
    getStore,
    createStore,
    updateStore,
    deleteStore,
    changeStatus
};
