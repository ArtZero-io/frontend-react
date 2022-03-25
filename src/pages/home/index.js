import React from 'react'
import Navbar from "../../components/Navbar";
import RoadmapItem from "../../components/RoadmapItem/RoadmapItem"

const HomePage = () => {
  return (
    <>
        <div className="herobg" />
        <Navbar/>
        <section className="hero">
            <div className="robot">
                {
                    [...Array(25)].map( (e, i) => {
                        return (
                            <div className='block' key={i}/>
                        )
                    })
                }

                <div className="corner right-bottom" />
                <div className="corner right-top" />
                <div className="corner left-bottom" />
                <div className="corner left-top" />
            </div>
            <div className="text">
                <div className="heading">Discover, Create, Collect & Trade NFTs</div>
                <div className="desc">Get quick & easy access to digital collectibles, explore & trade NFTs from different collections & artists.</div>
                <div className="button">Coming soon on Smartnet</div>
            </div>
        </section>

        <section className="airdrop">
            <img src="/assets/stars.png" className="stars-left" />
            <img src="/assets/ufo-ellipse.svg" className="ufo-ellipse" />
            <img src="/assets/ufo.png" className="ufo" />
            <img src="/assets/stars.png" className="stars-right" />
            <img src="/assets/ground.png" className="ground" />

            <h2>Airdrop / Bounty programs</h2>
            <div className="desc">We recently announced 80 winners for our first airdrop campaign.</div>
            <div className="winners">80 WINNERS</div>
            <div className="desc">Follow our <a target="_blank" href="https://twitter.com/ArtZero_io">Twitter</a> & join our <a target="_blank" href="https://t.me/artzero_io">Telegram</a> For Upcoming bounty programs</div>
        </section>

        <section className="nft">
            <img className="bg" src="/assets/bg-nft.png" />
            <div className="wrapper">
                <div className="text">
                    <h2>Create & sell your NFTs</h2>
                </div>
                <div className="cards">
                    <div className="card connect-wallet">
                        <img className="frame" src="/assets/frame-connect-wallet.svg" />
                        <img className="icon" src="/assets/icon-connect-wallet.svg" />
                        <h3>Connect your wallet</h3>
                        <div className="desc">ArtZero supports SubWallet and Polkadot JS wallet.</div>
                    </div>
                    <div className="card create-nft">
                        <img className="frame" src="/assets/frame-create-nft.svg" />
                        <img className="icon" src="/assets/icon-create-nft.svg" />
                        <h3>Create your NFTs</h3>
                        <div className="desc">Upload your work (image, video, audio, or 3D art), & a title & description, & customize your NFTs with properties, stats, & unlockable content.</div>
                    </div>
                    <div className="card create-collection">
                        <img className="frame" src="/assets/frame-create-collection.svg" />
                        <img className="icon" src="/assets/icon-create-collection.svg" />
                        <h3>Create your collection</h3>
                        <div className="desc">Add social links, a description, profile and banner images, and set a secondary sales fee.</div>
                    </div>
                    <div className="card list-nft">
                        <img className="frame" src="/assets/frame-list-nft.svg" />
                        <img className="icon" src="/assets/icon-list-nft.svg" />
                        <h3>List NFTs for sale</h3>
                        <div className="desc">Choose the NFT you want to sell and we help you sell them. Buyers can bid for the NFT or simply buy at fixed-price</div>
                    </div>
                </div>
            </div>
        </section>

        <section className="roadmap">
            <img src="/assets/roadmap-left.png" />
            <div className="main">
                <img className="grid" src="/assets/roadmap-grid.svg" />
                <h2>Roadmap</h2>
                <div className="desc">Note: ArtZero launch will depend on Smart Contract launch on Aleph Zero's Mainnet</div>
                <div className="cards">
                    <div className="q1">
                        <h3>Q1 - 2022</h3>
                        <RoadmapItem text="Public Smartnet version" />
                        <RoadmapItem text="Announce NFT Winners" />
                    </div>
                    <div className="q2">
                        <h3>Q2 - 2022</h3>
                        <RoadmapItem text="Public Testnet version" />
                        <RoadmapItem text="Code Audit and Review" />
                        <RoadmapItem text="Incentive programs for contributors" />
                    </div>
                    <div className="q3">
                        <h3>Q3 Q4 - 2022</h3>
                        <RoadmapItem text="Mainnet launch" />
                        <RoadmapItem text="Multi-chain support" />
                    </div>
                </div>
            </div>
            <img src="/assets/roadmap-right.png" />
        </section>

        <section className="partners">
            <img className="bg" src="/assets/bg-partners.png" />
            <div className="heading">
                <h2>Partners</h2>
                <div className="desc">Friends along for a ride</div>
            </div>
            <div className="subwallet">
                <img src="/assets/partners-logo-subwallet.png" />
            </div>
        </section>

        <section className="team">
            <h2>Core Team</h2>
            <div className="desc">We believe in Aleph Zero</div>
            <div className="carousel">
                <div className="member">
                    <div className="circle" />
                    <img className="brian" src="/assets/team-brian-nguyen.png" />
                    <div className="name">Brian Nguyen</div>
                    <div className="position">Founder</div>
                </div>
                <div className="member">
                    <img src="/assets/team-ha-vu.png" />
                    <div className="name">Ha Vu</div>
                    <div className="position">Business Development</div>
                </div>
                <div className="member">
                    <img src="/assets/team-frankie-kao.png" />
                    <div className="name">Frankie kao</div>
                    <div className="position">Art Director</div>
                </div>
                <div className="member">
                    <img src="/assets/team-albert-tran.png" />
                    <div className="name">Albert Tran</div>
                    <div className="position">Smart Contract & Back-end Developer</div>
                </div>
                <div className="member">
                    <img src="/assets/team-j.png" />
                    <div className="name">J.</div>
                    <div className="position">Full-Stack Developer</div>
                </div>
            </div>
        </section>

        <section className="advisors">
            <img src="/assets/advisor-border-top.svg" />
            <div className="main">
                <div className="heading">
                    <h2>Our Advisors</h2>
                    <div className="desc">Professional Advices from our close business friends</div>
                </div>
                <div className="hieu">
                    <img className="bg" src="/assets/advisor-frame-light.svg" />
                    <div className="content">
                        <img src="/assets/advisor-hieu.png" />
                        <div className="name">Hieu Dao</div>
                        <div className="desc">Co-Founder of <a href="https://subwallet.app/" target="_blank">SubWallet</a></div>
                    </div>
                </div>
                <div className="thong">
                    <img className="bg" src="/assets/advisor-frame.svg" />
                    <div className="content">
                        <img src="/assets/advisor-thong.png" />
                        <div className="name">Thong Tran</div>
                        <div className="desc">Founder of <a href="https://merchize.com/" target="_blank">Merchize</a></div>
                    </div>
                </div>
            </div>
            <img src="/assets/advisor-border-bottom.svg" />
        </section>

        <section className="subscribe">
            <img className="bg" src="/assets/bg-subscribe.png" />
            <h2>Subscribe to us</h2>
            <div className="desc">Let’s make a great impact together</div>
            <div className="inputs">
                <input className="email" type="text" placeholder="enter your email" />
                <div className="button">Subscribe</div>
            </div>
            <div className="social">
                <div className="telegram">
                    <div className="icon" />
                </div>
                <div className="email">
                    <div className="icon" />
                </div>
            </div>
            <div className="copyright">
                © Copyright 2022 artZero. All Rights Reserved
            </div>
        </section>
    </>
  )
}

export default HomePage

