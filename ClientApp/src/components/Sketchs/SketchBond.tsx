import React, { useRef, useLayoutEffect } from 'react';
import { PatternElement } from '../../types/Patterns';

interface IProps {
	element: PatternElement;
	to: PatternElement;
	isBidirectionnal?: boolean;
}

const SketchBond = ({ element, to, isBidirectionnal }: IProps) => {
	const ref = useRef<HTMLCanvasElement | null>(null);

	useLayoutEffect(() => {
		ref.current?.getContext('2d')?.arcTo(element.x, element.y, to.x, to.y, 100);
	}, []);

	return <canvas ref={ref} />;
};

export default SketchBond;
