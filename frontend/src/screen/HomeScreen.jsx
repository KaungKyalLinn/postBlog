import { Link } from "react-router-dom"

const HomeScreen = () => {
  return (
    <>
      <div className="page heroPage">
        <h1 className="heroTitle">Books in Blogs</h1>
        <h2 className="heroSubTitle">world's classic books's intros, reviews, reactions in one single blog</h2>
        <Link className="heroLink" to="/blog">start read blogs</Link>
      </div>
      <div className="page introPage">
        <div className="introHalf introLeft">
          <h2 className="introP">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto fugit a libero  animi repellendus modi expedita consequuntur enim voluptate debitis? 
          </h2>
        </div>
        <div className="introHalf introRight">
          <h1 className="introSubTitle">Lorem ipsum dolor sit amet.</h1>
        </div>
      </div>
      <div className="footer homeFooter">
        <div>
          <h2 className="white">post blog</h2>
          <p className="white">Lorem@gmail.com</p>
          <p className="white">555-555-555</p>
          <p className="white">lorem, lorem, lorem-33st</p>
        </div>
      </div>
    </>
  )
}

export default HomeScreen