const Talent = require('../models/Talent');

// Save media (videos or posts)
exports.saveMedia = async (req, res) => {
  const { email, mediaUrl, type } = req.body; // Media type can be "video" or "post"

  try {
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    // Save media URLs
    if (type === "video") {
      talent.skillVideos.push(mediaUrl); // Add video URL to the skillVideos array
    } else if (type === "post") {
      talent.posts.push(mediaUrl); // Add post URL to the posts array
    }

    await talent.save();
    res.status(200).json({ message: "Media saved successfully" });
  } catch (error) {
    console.error("Error saving media:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get media (videos and posts) for a talent
exports.getMedia = async (req, res) => {
  const { email } = req.query;

  try {
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    // Return the skill videos and posts
    res.status(200).json({
      skillVideos: talent.skillVideos,
      posts: talent.posts,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete media (videos or posts)

// Delete media (videos or posts)
exports.deleteMedia = async (req, res) => {
  const { email, type, url } = req.body;

  try {
    const talent = await Talent.findOne({ email });
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    if (type === "video") {
      const index = talent.skillVideos.indexOf(url.trim());
      if (index > -1) {
        talent.skillVideos.splice(index, 1);
        talent.markModified("skillVideos");
      }
    } else if (type === "post") {
      const index = talent.posts.indexOf(url.trim());
      if (index > -1) {
        talent.posts.splice(index, 1);
        talent.markModified("posts");
      }
    }

    await talent.save();
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ message: "Server error" });
  }
};






