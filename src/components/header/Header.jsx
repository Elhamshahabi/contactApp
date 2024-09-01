import React from "react";
import picProf from "../../assets/images/profilePicture.png";
import "./header.css";
const Header = ({ showFormHandler, groupDeleteHandler, selectedContacts }) => {
	return (
		<header className="Header">
			<div className="rigth-section">
				<img src={picProf} alt="Profile logo" className="profileUser" />
				<div className="userData">
					<h4>الهام شهابی</h4>
					<span>0912-432-3223</span>
				</div>
			</div>
			<div className="left-section">
				<button className="primary" onClick={e => showFormHandler(e)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"></path>
					</svg>
					<span> افزودن مخاطب</span>
				</button>
				<button
					className={`delete ${selectedContacts.length >= 1 ? "active" : ""}`}
					onClick={e => groupDeleteHandler(e)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M24 17v2h-3v-2c0-1.55-.7-2.94-1.82-3.94C24 13.55 24 17 24 17M18 5c1.66 0 3 1.34 3 3a2.996 2.996 0 0 1-3.9 2.86c.57-.81.9-1.79.9-2.86c0-1.06-.33-2.05-.9-2.86c.28-.09.59-.14.9-.14m-5 0c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m6 12v2H7v-2c0-2.21 2.69-4 6-4s6 1.79 6 4M.464 13.12L2.59 11L.464 8.88L1.88 7.46L4 9.59l2.12-2.13l1.42 1.42L5.41 11l2.13 2.12l-1.42 1.42L4 12.41l-2.12 2.13Z"></path>
					</svg>
					<span>حذف گروهی</span>
				</button>
			</div>
		</header>
	);
};

export default Header;
