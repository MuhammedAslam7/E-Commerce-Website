import { Wallet } from "../model/walletSchema.js"

export const getWallet = async(req, res) => {
    try {
        const {userId} = req.user
        if(!userId) {
            return res.status(404).json({message: "User is not valid"})
        }

        const wallet = await Wallet.findOne({userId})

        if(!Wallet) {
            return res.status(404).json({message: "User have no wallet"})
        }

        res.status(200).json({wallet})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
        console.log(error)
        
    }
}