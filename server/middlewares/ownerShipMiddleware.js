const Task = require("../Models/Task")

const checkOwnerShip = async ({resourcId, userId}) => {
    console.log({resourcId})
    const task = await Task.findById(resourcId);
    console.log({task});
    if (!task) {
        //  throw Error('Article not found')
        return false;
    }

    console.log('_doc', task._doc)
    if (task?._doc?.user?._id?.toString() === userId) {
        return true;
    }

    return false;
}


const ownerShip =  (model = '') =>  async (req, res, next) => {
    console.log(req)
    console.log('req.user.id', req.user.id)
    if (model === 'Task') {
        const isOwnr = await checkOwnerShip({resourcId: req?.params?.id, userId: req?.user?.id});
        console.log("isOwnr", isOwnr);

        if (isOwnr) {
            return next()
        }

         res.status(403).json({message: 'Forbidden request'})

        

    }

}

module.exports = {ownerShip}