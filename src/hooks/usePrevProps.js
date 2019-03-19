import { useRef, useEffect } from 'react';

const usePrevProps = (props) => {
	const prevPropsRef = useRef();
	useEffect(() => {
		prevPropsRef.current = props;
	}, [props]);
	return prevPropsRef.current || props;
}

export default usePrevProps;
