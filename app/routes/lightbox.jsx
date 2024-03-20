import { IoPlayCircleOutline } from "react-icons/io5";
const Lightbox =()=>{
    return(
  <div className="lightbox position-relative" >
    <div className="container">

      <div className="wrapper text-center ">
        <a href="#">
          <div className="buttonPlay mx-auto ">
               <IoPlayCircleOutline />
          </div>
        </a>
        <div className="title">          
              AWESOME VIDEO LIGHTBOX                               
        </div>
        <span className="sub-title text-white">          
           Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.                                
        </span>
      </div>
    
  </div>
</div>

    )
}
export default Lightbox;
