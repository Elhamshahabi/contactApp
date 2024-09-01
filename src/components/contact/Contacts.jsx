import React from "react";
import ContactCard from "./ContactCard";

const Contacts = ({
	contacts,
	deleteContactHandler,
	onSelectedHandler,
	editContactHandler,
	search,
}) => {
	return (
		<div className="contactContainer">
			{contacts
				?.filter(contact => {
					return (
						search === "" ||
						contact.fullName.includes(search) ||
						search === "" ||
						contact.phone.includes(search) ||
						search === "" ||
						contact.email.includes(search) ||
						search === "" ||
						contact.job.includes(search)
					);
				})
				.map(contact => (
					<ContactCard
						key={contact.id}
						contact={contact}
						deleteContactHandler={deleteContactHandler}
						onSelectedHandler={onSelectedHandler}
						editContactHandler={editContactHandler}
					/>
				))}
		</div>
	);
};

export default Contacts;
