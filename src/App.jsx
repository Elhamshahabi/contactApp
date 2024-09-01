import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import ContactCard from "./components/contact/ContactCard";
import logo from "./assets/images/logo.png";
import avatar from "./assets/images/avatar/default.png";
import prof1 from "./assets/images/avatar/1.png";
import prof2 from "./assets/images/avatar/2.png";
import prof3 from "./assets/images/avatar/3.png";
import prof5 from "./assets/images/avatar/5.png";
import prof7 from "./assets/images/avatar/7.png";
import prof8 from "./assets/images/avatar/8.png";
import prof11 from "./assets/images/avatar/11.png";
import prof12 from "./assets/images/avatar/13.png";
import prof14 from "./assets/images/avatar/14.png";
import prof15 from "./assets/images/avatar/15.png";
import prof16 from "./assets/images/avatar/16.png";
import prof17 from "./assets/images/avatar/17.png";
import prof18 from "./assets/images/avatar/18.png";

import { data } from "./data/data";
import Contacts from "./components/contact/Contacts";
import Loading from "./components/loading/Loading";

const avatarsData = [
	prof2,
	prof7,
	prof8,
	prof11,
	prof12,
	prof14,
	prof15,
	prof16,
	prof17,
	prof18,
];

function App() {
	const [showForm, setShowForm] = useState(false);
	const [loading, SetLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [contactDeleting, setContactDeleteing] = useState({});
	const [modal, setShowModal] = useState(false);
	const [groupDeleteModal, setGroupDeleteModal] = useState(false);
	const [showAvatarBox, setShowAvatarBox] = useState(false);
	const [contacts, setContacts] = useState([]);
	const [selectedContacts, setSelectedContacts] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [editContact, setEditContact] = useState({});
	const [avatar, setAvater] = useState("default.png");
	const [pics, setPics] = useState([]);
	const [newcontact, setNewContact] = useState({
		fullName: "",
		email: "",
		phone: "",
		job: "",
		image: "",
	});
	const [err, setErr] = useState({
		errName: null,
		errEmail: null,
		errPhone: null,
		errJob: null,
		formErr: null,
	});
	// generate uniqueId
	async function generateUniqueId() {
		return `${Date.now().toString(36)}${Math.random()
			.toString(36)
			.substr(2, 9)}`;
	}
	//validete Phone number function
	function validatePhoneNumber(phoneNumber) {
		// تعریف الگوی شماره تلفن
		const pattern = /^0\d{10}$/;
		// بررسی تطابق شماره تلفن با الگو
		if (pattern.test(phoneNumber)) {
			return true;
		} else {
			return false;
		}
	}
	//validate Email function
	function validateEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}
	// avatar handler
	const handleAvatarChange = e => {
		const src = e.target.src;
		const arrPath = src.split("/");
		setAvater(arrPath[arrPath.length - 1]);
		setShowAvatarBox(false);
	};
	// show avatar box handler
	const showAvatarBoxHandler = () => {
		setShowAvatarBox(!showAvatarBox);
	};
	// input validetion and change event handler
	const onchangeHandler = e => {
		let { name, value } = e.target;
		switch (name) {
			case "fullName":
				if (value.length > 5) {
					
					setNewContact({ ...newcontact, fullName: value });
					setErr({
						...err,
						errName: null,
					});
				} else {
					setErr({
						...err,
						errName: "نام و نام خانوادگی بزرگتر از 5 کارکتر باشد",
					});
					setNewContact({ ...newcontact, fullName: value });
				}
				break;
			case "phone":
				value = value.trim();
				if (validatePhoneNumber(value)) {
					setNewContact({ ...newcontact, phone: value });
					setErr({
						...err,
						errPhone: null,
					});
				} else {
					setErr({
						...err,
						errPhone: "شماره تلفن 11 رقمی بصورت صحیح وارد کنید",
					});
					setNewContact({ ...newcontact, phone: value });
				}
				break;
			case "job":
				if (value.length >= 2) {
					
					setNewContact({ ...newcontact, job: value });
					setErr({
						...err,
						errJob: null,
					});
				} else {
					setErr({
						...err,
						errJob: "شغل / نسبت مخاطب را وارد کنید",
					});
					setNewContact({ ...newcontact, job: value });
				}
				break;
			case "email":
				value = value.trim();
				if (validateEmail(value)) {
					setNewContact({ ...newcontact, email: value });
					setErr({
						...err,
						errEmail: null,
					});
				} else {
					setErr({
						...err,
						errEmail: "پست الکترونیکی را صحیح وارد کنید",
					});
					setNewContact({ ...newcontact, email: value });
				}
				break;
			default:
				break;
		}
	};
	// show create new contact form
	const showFormHandler = e => {
		setShowForm(!showForm);
	};
	// close new contact form
	const closeForm = async e => {
		if (!e.target.closest(".formWrapper")) {
			setShowForm(false);
			setNewContact({ fullName: "", email: "", phone: "", job: "", image: "" });
			setErr({
				errName: null,
				errEmail: null,
				errPhone: null,
				errJob: null,
				formErr: null,
			});
		}
		setEditContact({});
		setEditModal(false);
	};

	// on submiting form handler
	const onSubmitHandler = async e => {
		e.preventDefault();
		if (
			newcontact.fullName == "" ||
			err.errName ||
			newcontact.email == "" ||
			err.errEmail ||
			newcontact.job == "" ||
			err.errJob ||
			newcontact.phone == "" ||
			err.errPhone
		) {
			setErr({
				...err,
				formErr: " *** فیلد ها را پر و خطا ها را برطرف کنید  ***",
			});
		} else {
			setErr({
				...err,
				formErr: null,
			});
			let uniqueId = await generateUniqueId();
			const dataNewContact = {
				...newcontact,
				id: uniqueId,
				image: `/src/assets/images/avatar/${avatar}`,
			};
			e.target.reset();
			setNewContact({ fullName: "", email: "", phone: "", job: "", image: "" });
			setAvater("default.png");
			setErr({
				errName: null,
				errEmail: null,
				errPhone: null,
				errJob: null,
				formErr: null,
			});
			setShowForm(false);
			addNewContact(dataNewContact);
		}
	};

	const addNewContact = async data => {
		SetLoading(true);
		setContacts([...contacts, data]);
		return setTimeout(() => {
			SetLoading(false);
		}, 1500);
	};
	// inital data and set states
	const getAllContacts = async () => {
		setContacts(data);
		setPics([...avatarsData]);
		// console.log(avatarsData);
	};

	// delete contact
	const deleteContactHandler = id => {
		const selectedContact = contacts.find(contact => contact.id == id);
		if (selectedContact) {
			setShowModal(true);
			setContactDeleteing(selectedContact);
		}
	};

	const successModalHandler = e => {
		const contactId = e.target.value;
		const newContacts = contacts.filter(contact => contact.id != contactId);
		setContacts(newContacts);
		setShowModal(false);
	};
	// closeing modal for deleting contact
	const closeModalHandler = e => {
		setShowModal(false);
	};

	const onSelectedHandler = (e, id) => {
		if (e.target.checked) {
			const selectedContact = contacts.find(contact => contact.id == id);
			setSelectedContacts(prevStata => [...prevStata, selectedContact]);
		} else {
			const selectedContact = selectedContacts.findIndex(
				contact => contact.id == id,
			);
			selectedContacts.splice(selectedContact, 1);
			console.log(selectedContacts);
		}
	};

	const groupDeleteHandler = () => {
		if (selectedContacts.length >= 1) {
			setGroupDeleteModal(true);
		}
	};
	const successDeleteContact = e => {
		console.log(e.target.value);
		SetLoading(true);
		const newContacts = contacts.filter(
			contact => !selectedContacts.includes(contact),
		);
		setContacts(newContacts);
		setSelectedContacts([]);
		setGroupDeleteModal(false);
		setTimeout(() => {
			SetLoading(false);
		}, 500);
	};
	const cancelDeleteContact = () => {
		setSelectedContacts([]);
		setGroupDeleteModal(false);
	};

	// editing contact
	const updateContacts = data => {
		SetLoading(true);
		const updatedObjects = contacts.map(object => {
			if (object.id == data.id) {
				(object.fullName = data.fullName),
					(object.email = data.email),
					(object.phone = data.phone),
					(object.job = data.job),
					(object.image = data.image);
			}
			return object;
		});
		setContacts(updatedObjects);
		setTimeout(() => {
			SetLoading(false);
		}, 400);
	};

	const editContactHandler = id => {
		const contact = contacts.find(contact => contact.id == id);
		if (contact) {
			setEditContact(contact);
			setEditModal(true);
		}
	};
	const onchangEditHandler = e => {
		let { name, value } = e.target;
		switch (name) {
			case "fullName":
				if (value.trim().length > 5) {
					setEditContact(prevState => ({
						...prevState,
						fullName: value,
					}));
					setErr({
						...err,
						errName: null,
					});
				} else {
					setErr({
						...err,
						errName: "نام و نام خانوادگی بزرگتر از 5 کارکتر باشد",
					});
					setEditContact(prevState => ({ ...prevState, fullName: value }));
				}
				break;
			case "phone":
				if (validatePhoneNumber(value)) {
					setEditContact(prevState => ({ ...prevState, phone: value }));
					setErr({
						...err,
						errPhone: null,
					});
				} else {
					setErr({
						...err,
						errPhone: "شماره تلفن 11 رقمی بصورت صحیح وارد کنید",
					});
					setEditContact(prevState => ({ ...prevState, phone: value }));
				}
				break;
			case "job":
				if (value.length >= 2) {
					setEditContact(prevState => ({ ...prevState, job: value }));
					setErr({
						...err,
						errJob: null,
					});
				} else {
					setErr({
						...err,
						errJob: "شغل / نسبت مخاطب را وارد کنید",
					});
					setEditContact(prevState => ({ ...prevState, job: value }));
				}
				break;
			case "email":
				if (validateEmail(value)) {
					setEditContact(prevState => ({ ...prevState, email: value }));
					setErr({
						...err,
						errEmail: null,
					});
				} else {
					setErr({
						...err,
						errEmail: "پست الکترونیکی را صحیح وارد کنید",
					});
					setEditContact(prevState => ({ ...prevState, email: value }));
				}
				break;
			default:
				break;
		}
	};

	const onSubmitEditHandler = async e => {
		e.preventDefault();
		if (
			editContact.fullName == "" ||
			err.errName ||
			editContact.email == "" ||
			err.errEmail ||
			editContact.job == "" ||
			err.errJob ||
			editContact.phone == "" ||
			err.errPhone
		) {
			setErr({
				...err,
				formErr: " *** فیلد ها را پر و خطا ها را برطرف کنید  ***",
			});
		} else {
			setErr({
				...err,
				formErr: null,
			});

			const newData = {
				...editContact,
			};
			e.target.reset();
			setEditContact({});
			setAvater("default.png");
			setErr({
				errName: null,
				errEmail: null,
				errPhone: null,
				errJob: null,
				formErr: null,
			});
			setEditModal(false);
			console.log(newData);
			updateContacts(newData);
		}
	};

	const edithandleAvatarChange = e => {
		const src = e.target.src;
		const arrPath = src.split("/");
		setAvater(arrPath[arrPath.length - 1]);
		setShowAvatarBox(false);
	};

	useEffect(() => {
		const addContactForm =
			document.documentElement.querySelector(".addContactForm");
		addContactForm.addEventListener("click", e => closeForm(e));
		addContactForm.removeEventListener("cklick", e => closeForm(e));
		getAllContacts();
	}, []);
	useEffect(() => {
		setEditContact(prevState => ({
			...prevState,
			image: `/src/assets/images/avatar/${avatar}`,
		}));
	}, [avatar]);
	return (
		<div className="App">
			<div className="sidebar">
				<div className="head">
					<img src={logo} alt="logo app" />
					<h1>اپلیکیشن مخاطبین</h1>
					<button className="menuBtn">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.45}
								d="M6 8h12M6 12h12M6 16h12"></path>
						</svg>
					</button>
				</div>
				<div className="navbar">
					<h3 className="titleMenu">منوی اصلی</h3>
					<ul className="menuList">
						<li className="menuItem">
							<a href="#" className="menuLink active">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
									<path
										fill="currentColor"
										d="M28.4 124.8a6 6 0 0 0 8.4-1.2a54 54 0 0 1 86.4 0a6 6 0 0 0 8.4 1.19a5.6 5.6 0 0 0 1.19-1.19a54 54 0 0 1 86.4 0a6 6 0 0 0 9.6-7.21a65.74 65.74 0 0 0-29.69-22.26a38 38 0 1 0-46.22 0A65.3 65.3 0 0 0 128 110.7a65.3 65.3 0 0 0-24.89-16.57a38 38 0 1 0-46.22 0A65.7 65.7 0 0 0 27.2 116.4a6 6 0 0 0 1.2 8.4M176 38a26 26 0 1 1-26 26a26 26 0 0 1 26-26m-96 0a26 26 0 1 1-26 26a26 26 0 0 1 26-26m119.11 160.13a38 38 0 1 0-46.22 0A65.3 65.3 0 0 0 128 214.7a65.3 65.3 0 0 0-24.89-16.57a38 38 0 1 0-46.22 0A65.7 65.7 0 0 0 27.2 220.4a6 6 0 1 0 9.6 7.2a54 54 0 0 1 86.4 0a6 6 0 0 0 8.4 1.19a5.6 5.6 0 0 0 1.19-1.19a54 54 0 0 1 86.4 0a6 6 0 0 0 9.6-7.21a65.74 65.74 0 0 0-29.68-22.26M80 142a26 26 0 1 1-26 26a26 26 0 0 1 26-26m96 0a26 26 0 1 1-26 26a26 26 0 0 1 26-26"></path>
								</svg>
								<span>همه مخاطب ها</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<main className="main">
				{/* header */}
				<Header
					showFormHandler={showFormHandler}
					groupDeleteHandler={groupDeleteHandler}
					selectedContacts={selectedContacts}
				/>
				<div className="mainWrapper">
					<div className="mainHead">
						<div className="main-title">
							<h2>مخاطبین</h2>
							<p>مخاطبین خود را مدیریت کنید</p>
						</div>
						<div className="searchFormWrapper">
							<div className="input-field">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M10 13c-.35.59-.64 1.24-.81 1.93C6.5 15.16 3.9 16.42 3.9 17v1.1h5.3c.17.68.45 1.32.8 1.9H2v-3c0-2.66 5.33-4 8-4m0-9a4 4 0 0 1 4 4c0 .91-.31 1.75-.82 2.43c-.86.32-1.63.83-2.27 1.47L10 12a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 1.9A2.1 2.1 0 0 0 7.9 8a2.1 2.1 0 0 0 2.1 2.1A2.1 2.1 0 0 0 12.1 8A2.1 2.1 0 0 0 10 5.9m5.5 6.1c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5"></path>
								</svg>
								<input
									type="text"
									name="search"
									id="search"
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder="نام، ایمیل ویا شماره تلفن مخاطب را وارد کنید"
								/>
							</div>
							<button className="btn primary"> جستو جو</button>
						</div>
					</div>
					{/* contacts components */}
					{loading ? (
						<Loading />
					) : (
						<Contacts
							contacts={contacts}
							deleteContactHandler={deleteContactHandler}
							onSelectedHandler={onSelectedHandler}
							editContactHandler={editContactHandler}
							search={search}
						/>
					)}
					{/* contacts components */}
				</div>
				{/* header */}
			</main>

			<div className={`addContactForm ${showForm ? "show" : ""}`}>
				<div className={`formWrapper ${showForm ? "show" : ""}`}>
					<div className="formTitle">
						<h3>ایجاد مخاطب جدید</h3>
						<p>جهت ایجاد مخاطب فیلد ها را پر کنید</p>
					</div>
					<form className="addForm" onSubmit={e => onSubmitHandler(e)}>
						<div className="avatarField">
							<div className="avatar">
								<img
									src={`/src/assets/images/avatar/${avatar}`}
									alt="avatar"
									onClick={e => showAvatarBoxHandler(e)}
								/>
								<label onClick={e => showAvatarBoxHandler(e)}>
									تغییر آواتار
								</label>
							</div>
						</div>
						<div className="formField">
							<label htmlFor="fullName"> نام و نام خانوادگی</label>
							<input
								type="text"
								id="fullName"
								name="fullName"
								value={newcontact.fullName}
								onChange={e => onchangeHandler(e)}
							/>

							{err.errName && <span className="error">{err.errName}</span>}
						</div>
						<div className="formField">
							<label htmlFor="phone">شماره تلفن</label>
							<input
								type="text"
								id="phone"
								name="phone"
								value={newcontact.phone}
								maxLength={11}
								onChange={e => onchangeHandler(e)}
							/>
							{err.errPhone && <span className="error">{err.errPhone}</span>}
						</div>
						<div className="formField">
							<label htmlFor="job">شغل/ نسبت</label>
							<input
								type="text"
								id="job"
								name="job"
								value={newcontact.job}
								onChange={e => onchangeHandler(e)}
							/>
							{err.errJob && <span className="error">{err.errJob}</span>}
						</div>
						<div className="formField">
							<label htmlFor="email">پست الکترونیکی</label>
							<input
								type="text"
								id="email"
								name="email"
								value={newcontact.email}
								onChange={e => onchangeHandler(e)}
							/>
							{err.errEmail && <span className="error">{err.errEmail}</span>}
						</div>

						<div className="btnField">
							<button type="submit" className="btn primary">
								ایجاد مخاطب
							</button>
							{err.formErr && <span className="error">{err.formErr}</span>}
						</div>
					</form>
					<div className={`avatarBox ${showAvatarBox ? "show" : ""}`}>
						{pics.map((pic, index) => (
							<img src={pic} key={index} onClick={e => handleAvatarChange(e)} />
						))}
					</div>
				</div>
			</div>
			<div className={`modalWrapper ${modal ? "show" : ""}`}>
				<div className="modal">
					<div className="modalContent">
						<div>
							<span> شما در حال حذف </span>
							<span className="contactName">
								{contactDeleting && contactDeleting.fullName}
							</span>
							<span> از لیست مخاطبین هستید </span>
						</div>
						<h3>آیا از این کار اطمینان دارید؟</h3>
						<p>
							با <span className="text-success">تائید </span>این کار اطلاعات
							مخاطب از بین خواهد رفت
						</p>
					</div>
					<div className="modalActionBtns">
						<button
							className="success"
							value={contactDeleting.id}
							onClick={e => successModalHandler(e)}>
							تـــائـــیـــد
						</button>
						<button className="cancel" onClick={e => closeModalHandler(e)}>
							انـــصــرافـــ
						</button>
					</div>
				</div>
			</div>
			<div className={`modalWrapper ${groupDeleteModal ? "show" : ""}`}>
				<div className="modal">
					<div className="modalContent">
						<div>
							<span> شما در حال حذف </span>
							<span className="contactName">
								{selectedContacts.length && selectedContacts.length} مخاطب
							</span>
							<span> از لیست مخاطبین هستید </span>
						</div>
						<h3>آیا از این کار اطمینان دارید؟</h3>
						<p>
							با <span className="text-success">تائید </span>این کار اطلاعات
							مخاطب از بین خواهد رفت
						</p>
					</div>
					<div className="modalActionBtns">
						<button
							className="success"
							value={true}
							onClick={e => successDeleteContact(e)}>
							تـــائـــیـــد
						</button>
						<button className="cancel" onClick={e => cancelDeleteContact(e)}>
							انـــصــرافـــ
						</button>
					</div>
				</div>
			</div>

			<div className={`addContactForm editForms ${editModal ? "show" : ""}`}>
				<div className={`formWrapper ${editModal ? "show" : ""}`}>
					<div className="formTitle">
						<h3>ویرایش مخاطب</h3>
						<p>جهت ویرایش مخاطب فیلد های مورد نظر را ویرایش کنید</p>
					</div>
					<form className="addForm" onSubmit={e => onSubmitEditHandler(e)}>
						<div className="avatarField">
							<div className="avatar">
								<img
									src={`${editContact.image}`}
									alt="avatar"
									onClick={e => showAvatarBoxHandler(e)}
								/>
								<label onClick={e => showAvatarBoxHandler(e)}>
									تغییر آواتار
								</label>
							</div>
						</div>
						<div className="formField">
							<label htmlFor="fullNameEdit"> نام و نام خانوادگی</label>
							<input
								type="text"
								id="fullNameEdit"
								name="fullName"
								value={editContact.fullName || ""}
								onChange={e => onchangEditHandler(e)}
							/>

							{err.errName && <span className="error">{err.errName}</span>}
						</div>
						<div className="formField">
							<label htmlFor="phoneEdit">شماره تلفن</label>
							<input
								type="text"
								id="phoneEdit"
								name="phone"
								value={editContact.phone || ""}
								maxLength={11}
								onChange={e => onchangEditHandler(e)}
							/>
							{err.errPhone && <span className="error">{err.errPhone}</span>}
						</div>
						<div className="formField">
							<label htmlFor="jobEdit">شغل/ نسبت</label>
							<input
								type="text"
								id="jobEdit"
								name="job"
								value={editContact.job || ""}
								onChange={e => onchangEditHandler(e)}
							/>
							{err.errJob && <span className="error">{err.errJob}</span>}
						</div>
						<div className="formField">
							<label htmlFor="emailEdit">پست الکترونیکی</label>
							<input
								type="text"
								id="emailEdit"
								name="email"
								value={editContact.email || ""}
								onChange={e => onchangEditHandler(e)}
							/>
							{err.errEmail && <span className="error">{err.errEmail}</span>}
						</div>

						<div className="btnField">
							<div className="btns">
								<button type="submit" className="btn primary">
									ویـــرایــش مخاطــــب
								</button>
								<button
									type="button"
									className="btn"
									onClick={e => closeForm(e)}>
									انـــصــرافـــ
								</button>
							</div>
							{err.formErr && <span className="error">{err.formErr}</span>}
						</div>
					</form>
					<div className={`avatarBox ${showAvatarBox ? "show" : ""}`}>
						{pics.map((pic, index) => (
							<img
								src={pic}
								key={index}
								onClick={e => edithandleAvatarChange(e)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
