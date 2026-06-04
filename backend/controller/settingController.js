import Setting from "../config/models/setting.js";

// export const updateSettings = async (req,res)=>{

//     const user = req.user;
//     const{generalSetting , notification} = req.body

//     console.log(req.body.settings)
//     const setting = await Setting.findOne({userId:req.user._id})
//     console.log('user' , setting)

//     try {const setting = await Setting.findOne({
//   userId: req.user._id,
// });

// setting.generalSetting = generalSetting;

// await setting.save();

// console.log(setting.generalSetting);
//            const updated = await Setting.findOneAndUpdate(
//             {userId:user._id},
//             {
//               $set:{
//                 generalSetting , notification
//             }},

//             {new:true,   runValidators: true``}
//            )
//            console.log('updated',updated)

//     res.status(200).json({
//       success: true,
//       setting: updated
//     });

//     } catch (error) {

//         return res.status(500).json({
//             success:true,
//             error:error.message
//         })

//     }

export const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    console.log('get',settings);

    const updated=await Setting.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          generalsettings:settings.generalSetting,
          notifications:settings.generalnotification
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      setting:updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// }

// export const fetchSetting = async(req,res)=>{
//     const user = req.user;
//     console.log(user)

//   try {

//    const userSetting = await Setting.findOne({userId:user._id})

//    if(!userSetting) {
//     await Setting.create({userId:user._id})

//    }

//    const generalSetting = {
//       appearance:userSetting.settings.appearance,
//       contrast: userSetting.settings.contrast,
//       accColor: userSetting.settings.accColor,

//    }

//    const notifications = userSetting.settings.notifications
//    console.log('noti',notifications)

//     return res.status(200).json({
//     success:true,
//     message:"sent settings",
//     generalSetting,
//     notifications
//    })

//   } catch (error) {
//     return res.status(500).json({
//       success:false,
//       error:error.message
//     })

//   }

// }

export const fetchSetting = async (req, res) => {
  try {
    let userSetting = await Setting.findOne({
      userId: req.user._id,
    });

    if (!userSetting) {
      userSetting = await Setting.create({
        userId: req.user._id,
      });
    }
    console.log(userSetting);

    return res.status(200).json({
      success: true,
      generalSetting: userSetting.generalsettings,
      notification: userSetting.notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
