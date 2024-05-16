import React, { useState } from "react";
import ImagePreview from "./ImagePreview";

// const IMAGES = [];

const About = () => {
  const [viewImage, setViewImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const viewImageHandler = (url) => {
    setViewImage(true);
    setImgUrl(url);
  };

  return (
    <section className="about">
      {viewImage && <ImagePreview url={imgUrl} setViewImage={setViewImage} />}

      <div className="flex row-rev" style={{ margin: "50px 0px" }}>
        <div className="description flex column">
          <h2 className="bold">לזכר דניאל ז"ל גיבור ישראל</h2>
          <p>
            לדניאל היה פטור מגיוס לצבא,הוא רצה להתגייס כי האמין שכל אחד צריך
            מעצמו למדינה. הוא עשה מכינה קדם צבאית כדי להתגייס ובסוף הגיע לנח"ל
            עשה גיבוש והגיע לסיירת,יצא לקורס מכים ואפילו התאמן לאליפות צה"ל בקרב
            מגע. ב7.10 דניאל יצא לסיור שגרתי באנדרטת הנחל שליד מוצב סופה, דניאל
            החליף את המפקצ שלו אחרי שנהרג. אחריי ההתקלות הראשונה אמרו לדניאל
            בקשר שמגיעות שתיי חוליות מחבלים מנקודות שונות...
          </p>
        </div>
      </div>

      <video
        controls
        poster="https://res.cloudinary.com/dzeycmkct/image/upload/v1715853260/Untitled_vcte1i.png"
      >
        <source
          src="https://res.cloudinary.com/dzeycmkct/video/upload/v1710690252/VIDEO-2024-03-14-15-55-26_hzhm5y.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="images-container flex justify-center wrap">
        <div className="image">
          <img
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1706546156/WhatsApp_Image_2024-01-29_at_16.09.50_1_z9bspi.jpg"
            alt="Soldier Image 1"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1706546156/WhatsApp_Image_2024-01-29_at_16.09.50_1_z9bspi.jpg"
              )
            }
          />
        </div>
        <div className="image">
          <img
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1715852588/WhatsApp_Image_2024-05-06_at_14.05.05_1_yhlcds.jpg"
            alt="Soldier Image 2"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1715852588/WhatsApp_Image_2024-05-06_at_14.05.05_1_yhlcds.jpg"
              )
            }
          />
        </div>
        <div className="image">
          <img
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1715852587/WhatsApp_Image_2024-05-06_at_14.05.05_bsufoz.jpg"
            alt="Soldier Image 3"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1715852587/WhatsApp_Image_2024-05-06_at_14.05.05_bsufoz.jpg"
              )
            }
          />
        </div>
        <div className="image">
          <img
            src="https://res.cloudinary.com/dzeycmkct/image/upload/c_crop,w_1000,h_1000,ar_1:1/v1706546156/WhatsApp_Image_2024-01-29_at_16.09.51_k9xgkn.jpg"
            alt="Soldier Image 4"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/c_crop,w_1000,h_1000,ar_1:1/v1706546156/WhatsApp_Image_2024-01-29_at_16.09.51_k9xgkn.jpg"
              )
            }
          />
        </div>
        <div className="image">
          <img
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1715852586/WhatsApp_Image_2024-05-06_at_14.05.05_2_ms6eyh.jpg"
            alt="Soldier Image 5"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1715852586/WhatsApp_Image_2024-05-06_at_14.05.05_2_ms6eyh.jpg"
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default About;
