import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    generalsettings: {
      theme: {
        type: String,
        enum: ["Dark", "Light", "System"],
        default: "System",
      },

      contrast: {
        type: String,
        enum: ["System", "Medium", "High"],
        default: "System",
      },

      accColor: {
        type: String,
        enum: ["Default", "Pink", "Green", "Purple", "Yellow"],
        default: "Default",
      },

  
    },
        notifications: {
        push: {
          type: Boolean,
          default: true,
        },

        email: {
          type: Boolean,
          default: false,
        },

        u_push: {
          type: Boolean,
          default: true,
        },

        u_email: {
          type: Boolean,
          default: false,
        },
      },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;