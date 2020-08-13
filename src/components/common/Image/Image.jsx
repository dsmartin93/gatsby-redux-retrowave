import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

// Note: You can change "images" to whatever you'd like.

const Image = (props) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) => n.node.relativePath.includes(props.filename));
      if (!image) {
        return null;
      }

      // const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      return <Img alt={props.alt} fluid={image.node.childImageSharp.fluid} />;
    }}
  />
);

Image.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
