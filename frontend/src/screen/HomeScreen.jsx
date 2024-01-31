import { Link } from "react-router-dom";
import fullSuitMan2 from "../images/full_suit_man_2.jpg";
import fullSuitMan3 from "../images/full_suit_man_3.jpg";
import { useGetBlogsQuery } from "../feature/readBlogApi";
import { FaCheck, FaUserShield, FaLock} from "react-icons/fa";

const HomeScreen = () => {
  const {data : blogs} = useGetBlogsQuery();

  return (
    <>
      <div className="page heroPage">
        <div className="bgCover"></div>
        <div className="heroLetterDiv">
          <h1 className="heroTitle">Books in Blogs</h1>
          <h2 className="heroSubTitle">world's classic books's intros, reviews, reactions in one single blog</h2>
          <Link className="heroLink toBlogBtn" to="/blog">start read blogs</Link>
        </div>
        <div className="recentBlogsParent">
          <h2 className="recentBlogTitle">recent blogs</h2>
          {blogs && 
            <div className="recentBlogsDiv">
              <div className="recentBlog">
                <h3 className="theBlogTitle">{blogs[0].blogName}</h3>
                <p className="theBlogPara">by - {blogs[0].author}</p>
              </div>
              <div className="recentBlog">
                <h3 className="theBlogTitle">{blogs[1].blogName}</h3>
                <p className="theBlogPara">by - {blogs[1].author}</p>
              </div>
              <div className="recentBlog">
                <h3 className="theBlogTitle">{blogs[2].blogName}</h3>
                <p className="theBlogPara">by - {blogs[2].author}</p>
              </div>
            </div>
          }
          
        </div>
      </div>
      <div className="page introPage">
        <div className="introHalf introLeft">
          <div className="introImgOneDiv introImgDiv">
            <img className="legendImg" src={fullSuitMan3} alt="our_legend_one" />
          </div>
          <div className="introImgTwoDiv introImgDiv">
            <img className="legendImg" src={fullSuitMan2} alt="our_legend_two" />
          </div>
        </div>
        <div className="introHalf introRight">
          <h2 className="introLegend">Even legend bloger use our platfrom, with their trust.</h2>
        </div>
      </div>
      <div className="page offerPage">
        <div className="offerDiv">
          <div className="theOffer">
            <div>
              <FaUserShield className="offerIcons"/>
              <h2>Save</h2>
            </div>
          </div>
          <div className="theOffer">
            <div>
              <FaLock className="offerIcons offerIconsTwo"/>
              <h2>Scure</h2>
            </div>
          </div>
          <div className="theOffer">
            <div>
              <FaCheck className="offerIcons"/>
              <h2>Free</h2>
            </div>
          </div>
        </div>
        <div className="offerInfo">
          <h3>We store user's blogs in save place and user can use our platform safely for free for unlimit post.</h3>
        </div>
      </div>
      <div className="footer homeFooter">
        <div>
          <h2>post blog</h2>
          <p>Lorem@gmail.com</p>
          <p>555-555-555</p>
          <p>lorem, lorem, lorem-33<sup>st</sup></p>
        </div>
      </div>
    </>
  )
}

export default HomeScreen