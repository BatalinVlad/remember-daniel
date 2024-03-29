import React, { useState } from "react";
import ImagePreview from "./ImagePreview";

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

      <video controls>
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
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1706546154/WhatsApp_Image_2024-01-29_at_16.09.56_qslnws.jpg"
            alt="Soldier Image 2"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1706546154/WhatsApp_Image_2024-01-29_at_16.09.56_qslnws.jpg"
              )
            }
          />
        </div>
        <div className="image">
          <img
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1706546155/WhatsApp_Image_2024-01-29_at_16.09.53_dkn0ao.jpg"
            alt="Soldier Image 3"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1706546155/WhatsApp_Image_2024-01-29_at_16.09.53_dkn0ao.jpg"
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
            src="https://res.cloudinary.com/dzeycmkct/image/upload/v1706546158/WhatsApp_Image_2024-01-29_at_16.09.50_2_sxfrnc.jpg"
            alt="Soldier Image 5"
            onClick={() =>
              viewImageHandler(
                "https://res.cloudinary.com/dzeycmkct/image/upload/v1706546158/WhatsApp_Image_2024-01-29_at_16.09.50_2_sxfrnc.jpg"
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default About;
