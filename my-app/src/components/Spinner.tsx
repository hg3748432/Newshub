const Spinner = () => {
	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 z-10 '>
			<div className='h-20 w-21 border-b-8 border-b-primary animate-spin'></div>
		</div>
	);
};

export { Spinner };
