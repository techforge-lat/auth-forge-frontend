import { Spinner } from "./spinner";

const Loader = () => {
	return (
		<div className="w-screen h-screen flex items-center gap-3 justify-center">
			<Spinner>Cargando...</Spinner>
		</div>
	);
};

export default Loader;
