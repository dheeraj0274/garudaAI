const verifyOTP = async(userOTP)=>{
    try {
        const otpRecord = await otp.findOne({email});
        const isUser = await User.findOne({email});
    
        if(isUser) return res.status(400).json({
          success:false,
          message:'Already registered'
        })
    
        if(!otpRecord) return res.status(400).json({
          success:false,
          message:'Otp not found or expired'
        })
    
    
        if(otpRecord.otp != userOTP) return res.status(401).json({
          success:true,
          message:'Invalid OTP'
        })
    
        if(otpRecord.expiresAt<Date.now()) return res.status(400).json({
          success:false,
          message:'OTP Expired'
        })
        return res.status(200).json({message:"otp verified" , success:true});
        
    } catch (error) {
        return res.status(500).json({message:error , success:false
        })
        
    }
      
}
export default verifyOTP;