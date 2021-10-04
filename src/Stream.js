import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import MoreVerticalIcon from './MoreVerticalIcon';

const Stream = ({containerHeight, containerWidth, mediaStream}) => {
  const videoRef = useRef();
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    video.srcObject = mediaStream;
    video.addEventListener('resize', () => {
      const height = video.videoHeight;
      const width = video.videoWidth;

      const xK = containerWidth / width;
      const yK = containerHeight / height;
      const k = Math.min(xK, yK);

      setHeight(height * k)
      setWidth(width * k)
    })
  }, [mediaStream]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        position: 'relative',
        backgroundColor: 'black',
      }}
    >
      <div style={{
        margin: 'auto',
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
      }}>
        <video
          autoPlay
          muted
          ref={videoRef}
          style={{width: '100%', height: '100%'}}
        />
        <MoreVerticalIcon
          fill="#fff"
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            backgroundColor: '#333',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
};

Stream.propTypes = {
  containerHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  mediaStream: PropTypes.object.isRequired,
};

export default Stream;
