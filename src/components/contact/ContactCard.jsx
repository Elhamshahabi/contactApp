import React from "react";

const ContactCard = ({
	contact,
	deleteContactHandler,
	onSelectedHandler,
	editContactHandler,
}) => {
	return (
		<article className="contactBox">
			<div className="head-box">
				<div className="selecting">
					<input
						type="checkbox"
						name={`contact-${contact.id}`}
						id={`contact-${contact.id}`}
						value={contact.id}
						onChange={e => onSelectedHandler(e, contact.id)}
					/>
					<label htmlFor={`contact-${contact.id}`}>علامت گذاری</label>
				</div>
				<img src={contact.image} alt="user profile" />
				<div>
					<h3>{contact.fullName}</h3>
					<p>{contact.job}</p>
				</div>

				<div className="actionIcons">
					<button
						className="delete"
						onClick={e => deleteContactHandler(contact.id)}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
						</svg>
					</button>
					<button
						className="edit"
						onClick={e => editContactHandler(contact.id)}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1408">
							<path
								fill="currentColor"
								d="m888 1056l116-116l-152-152l-116 116v56h96v96zm440-720q-16-16-33 1L945 687q-17 17-1 33t33-1l350-350q17-17 1-33m80 594v190q0 119-84.5 203.5T1120 1408H288q-119 0-203.5-84.5T0 1120V288Q0 169 84.5 84.5T288 0h832q63 0 117 25q15 7 18 23q3 17-9 29l-49 49q-14 14-32 8q-23-6-45-6H288q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q15-15 35-7t20 29m-96-738l288 288l-672 672H640V864zm444 132l-92 92l-288-288l92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68"></path>
						</svg>
					</button>
				</div>
			</div>
			<div className="body-box">
				<div>
					<span>
						{" "}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 32">
							<g fill="currentColor">
								<path d="M1.5 32h16c.827 0 1.5-.673 1.5-1.5v-29c0-.827-.673-1.5-1.5-1.5h-16C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M1 1.5a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v29a.5.5 0 0 1-.5.5h-16a.5.5 0 0 1-.5-.5z"></path>
								<path d="M2.5 27h14a.5.5 0 0 0 .5-.5v-21a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v21a.5.5 0 0 0 .5.5M3 6h13v20H3z"></path>
								<circle cx={10} cy={29} r={1}></circle>
								<path d="M7.5 4h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1"></path>
							</g>
						</svg>
					</span>
					<h4>{contact.phone}</h4>
					<button className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<g fill="none" stroke="currentColor">
								<rect width={9} height={13} x={6.5} y={6.5} rx={1.5}></rect>
								<path d="M8.5 6A1.5 1.5 0 0 1 10 4.5h6A1.5 1.5 0 0 1 17.5 6v10a1.5 1.5 0 0 1-1.5 1.5"></path>
							</g>
						</svg>
					</button>
				</div>
				<div>
					<span>
						{" "}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"></path>
						</svg>
					</span>
					<h5> {contact.email} </h5>
					<button className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<g fill="none" stroke="currentColor">
								<rect width={9} height={13} x={6.5} y={6.5} rx={1.5}></rect>
								<path d="M8.5 6A1.5 1.5 0 0 1 10 4.5h6A1.5 1.5 0 0 1 17.5 6v10a1.5 1.5 0 0 1-1.5 1.5"></path>
							</g>
						</svg>
					</button>
				</div>
			</div>
		</article>
	);
};

export default ContactCard;
