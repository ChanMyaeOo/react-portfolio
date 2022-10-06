import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = ({ data }) => {
    const [url, setUrl] = useState(
        "mailto:chanmyaeoo1221gg@gmail.com?subject=subject&body=body"
    );

    const YOUR_SERVICE_ID = "service_u24csot";
    const YOUR_TEMPLATE_ID = "template_9qhsxfq";
    const YOUR_PUBLIC_KEY = "RvFwVGwPeXD7TrFLW";

    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function sendMail(e) {
        e.preventDefault();

        emailjs
            .sendForm(
                YOUR_SERVICE_ID,
                YOUR_TEMPLATE_ID,
                e.target,
                YOUR_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setFormData({
                        user_name: "",
                        user_email: "",
                        subject: "",
                        message: "",
                    });
                    alert("Your message was sent. Thank you!");
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                    alert("Error");
                }
            );
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            )
            .join("&");
    };

    const handleSubmit = (e) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...formData }),
        })
            .then(() => alert("Success!"))
            .catch((error) => alert(error));

        e.preventDefault();
    };

    return (
        <section id="contact">
            <div className="row section-head">
                <div className="two columns header-col">
                    <h1>
                        <span>Get In Touch.</span>
                    </h1>
                </div>

                <div className="ten columns">
                    <p className="lead">{data?.message}</p>
                </div>
            </div>

            <div className="row">
                <div className="eight columns">
                    <form
                        id="contactForm"
                        name="contactForm"
                        onSubmit={sendMail}
                    >
                        <fieldset>
                            <div>
                                <label htmlFor="contactName">
                                    Name <span className="required">*</span>
                                </label>
                                <input
                                    value={formData.user_name}
                                    type="text"
                                    size="35"
                                    id="contactName"
                                    name="user_name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contactEmail">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    value={formData.user_email}
                                    type="email"
                                    size="35"
                                    id="contactEmail"
                                    name="user_email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contactSubject">
                                    Subject<span className="required">*</span>
                                </label>
                                <input
                                    value={formData.subject}
                                    type="text"
                                    size="35"
                                    id="contactSubject"
                                    name="subject"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="contactMessage">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={handleChange}
                                    cols="50"
                                    rows="15"
                                    id="contactMessage"
                                    name="message"
                                ></textarea>
                            </div>

                            <div>
                                <button type="submit" className="submit">
                                    Submit
                                </button>
                                <span id="image-loader">
                                    <img alt="" src="images/loader.gif" />
                                </span>
                            </div>
                        </fieldset>
                    </form>

                    <div id="message-warning"> Error boy</div>
                    <div id="message-success">
                        <i className="fa fa-check"></i>Your message was sent,
                        thank you!
                        <br />
                    </div>
                </div>

                <aside className="four columns footer-widgets">
                    <div className="widget widget_contact">
                        <h4>Address and Phone</h4>
                        <p className="address">
                            {data?.name}
                            <br />
                            {data?.address.street}, <br />
                            {data?.address.city}
                            <br />
                            <span>{data?.phone}</span>
                        </p>
                    </div>

                    <div className="widget widget_tweets"></div>
                </aside>
            </div>
        </section>
    );
};

export default Contact;
