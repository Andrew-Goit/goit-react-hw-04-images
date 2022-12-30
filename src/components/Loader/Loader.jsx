import { ColorRing } from 'react-loader-spinner';
import '../Loader/Loader.css';

const Loader = () => {
  return (
    <div className='backdrop'>
      <ColorRing
        height="80"
        width="80"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        visible={true}
        ariaLabel="blocks-loading"
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        wrapperClass="blocks-wrapper"
        
      />
    </div>
  );
};

export default Loader;