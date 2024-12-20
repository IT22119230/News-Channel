import News from "../models/news.model.js";

// Create news
export const Create = async (req, res, next) => {
  const { title, descreption, category, image } = req.body;
  const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  
  const newNews = new News({
    Newsname: title,
    descreption,
    category,
    Picture: image,
    slug,
  });

  try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    next(error);
  }
};

// Get all news
export const getnews = async (req, res, next) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    next(error);
  }
};

// Delete news
export const deleteNews = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const Getnews= async(req,res,next)=>{
    const userId= req.params.id;
    News.findOne({ _id: userId }).then((news) => {
        if (news) {
          
          res.json(news);
        } else {
          res.status(404).json({ message: 'News not found' });
        }
      }).catch((error) => {
        console.error('Database error:', error); 
        res.status(500).json({ message: 'Internal server error' });
      });
      
  
  }
  export const updatenews = async (req, res, next) => {
    try {
        // Ensure that all expected fields are received
        console.log("Request Body:", req.body);

        const updatenews = await News.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    Newsname: req.body.Newsname || '', 
                    descreption: req.body.descreption || '',
                    category: req.body.category || '',
                    Picture: req.body.Picture || '',
                },
            },
            { new: true } 
        );

        if (!updatenews) {
            return res.status(404).json({ message: "News not found" });
        }

        console.log("Updated News:", updatenews);
        res.status(200).json(updatenews);
    } catch (error) {
        console.error("Error in updating news:", error);
        next(error);
    }
};


  export const Delete= async(req,res,next)=>{
    let userId = req.params.id;
   
  News.findByIdAndDelete(userId)
  .then (() => {
  res.status (200).send({status: "event deleted"})
  }).catch((err) => {
  console.log(err);
  res.status (500). send({status: "Error with deleting data", error: err.message});
  })}
