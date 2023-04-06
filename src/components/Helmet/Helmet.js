import { Helmet } from 'react-helmet';

export default function HeadHelmet({ title, image }) {
  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* <!-- HTML Meta Tags --> */}
      <title>ArtZero.io - NFT Marketplace for Astar Network Blockchain</title>
      <meta
        name="description"
        content="Discover, create, collect and trade NFTs on Astar Network Blockchain with ArtZero.io"
      />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta
        itemprop="name"
        content="ArtZero.io - NFT Marketplace for Astar Network Blockchain"
      />

      <meta
        itemprop="description"
        content="Discover, create, collect and trade NFTs on Astar Network Blockchain with ArtZero.io"
      />

      <meta itemprop="image" content="https://artzero.io/assets/preview.jpg" />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://artzero.io" />
      <meta property="og:type" content="website" />

      <meta
        property="og:title"
        content="ArtZero.io - NFT Marketplace for Astar Network Blockchain"
      />

      <meta
        property="og:description"
        content="Discover, create, collect and trade NFTs on Astar Network Blockchain with ArtZero.io"
      />
      <meta
        property="og:image"
        content="https://artzero.io/assets/preview.jpg"
      />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="artzero.io" />
      <meta property="twitter:url" content="https://artzero.io/" />

      <meta
        name="twitter:title"
        content="ArtZero.io - NFT Marketplace for Astar Network Blockchain"
      />

      <meta
        name="twitter:description"
        content="Discover, create, collect and trade NFTs on Astar Network Blockchain with ArtZero.io"
      />

      <meta
        name="twitter:image"
        content="https://artzero.io/assets/preview.jpg"
      />
    </Helmet>
  );
}
