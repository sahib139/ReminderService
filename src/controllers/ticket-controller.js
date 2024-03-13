const {TicketAndEmailService} = require("../service/index");

const service = new TicketAndEmailService();

const create=async (req,res)=>{
    try {
        const response = await service.create(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            message:"ticket successfully created",
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to create ticket",
            err:error,
        });
    }
}

module.exports={
    create,
}