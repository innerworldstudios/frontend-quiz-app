import Subject from '../subject/Subject';
import Mode from '../mode/Mode';
import './header.css';

const Header = () => {
	return (
		<header>
			<nav>
				<ul>
					<Subject />
					<Mode />
				</ul>
			</nav>
		</header>
	);
};

export default Header;
