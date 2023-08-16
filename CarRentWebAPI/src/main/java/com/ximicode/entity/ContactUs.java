package com.ximicode.entity;

import jakarta.persistence.*;

@Entity
public class ContactUs {

    @Id
    @SequenceGenerator(
            name = "contactUs_id_seq",
            sequenceName = "contactUs_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "contactUs_id_seq"
    )
    private int id;

    private String name;

    private String subject;

    private String message;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_id")
    private User fromUser;

    public ContactUs() {
    }

    public ContactUs(int id, String name, String subject, String message, User fromUser) {
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.message = message;
        this.fromUser = fromUser;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getFromUser() {
        return fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    @Override
    public String toString() {
        return "ContactUs{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", subject='" + subject + '\'' +
                ", message='" + message + '\'' +
                ", fromUser=" + fromUser +
                '}';
    }
}
