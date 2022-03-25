import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <div className="navbar">
        <span>
          <Link to="/"><img src='/assets/logo.png' /></Link>
        </span>
        <span>
          <Link to="/airdrop">AIRDROP/BOUNTY</Link>
        </span>
        <span>
          <Link to="/roadmap">ROAD MAP</Link>
        </span>
        <span>
          <Link to="/partners">PARTNERS</Link>
        </span>
        <span>
          <Link to="/team">TEAM & ADVISORS</Link>
        </span>
        <span>
          <Link to="/subscribe">SUBSCRIBE</Link>
        </span>
      </div>
  )
}

export default Navbar
