package com.ximicode.entity;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String lastName;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @JsonIgnore
    @NotBlank
    @Size(max = 120)
    private String password;

    @Lob
    private byte[] profilePicture;

    private long identityId;

    private long licenceId;

    private int phoneNumber;

    private String country;

    private String city;

    private int zipCode;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private Set<Orders> orders = new HashSet<>();

    public User() {
    }

    public User(int id, String name, String lastName, byte[] profilePicture) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
    }

    public User(String name , String lastName ,
                String username, String email,
                String password, byte[] profilePicture,
                long identityId, long licenceId,
                int phoneNumber, String country, String city, int zipCode, Set<Orders> orders) {
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.identityId = identityId;
        this.licenceId = licenceId;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.city = city;
        this.zipCode = zipCode;
        this.orders = orders;
    }

    public User(String name , String lastName ,
                String username, String email,
                String password,
                long identityId, long licenceId,
                int phoneNumber, String country, String city, int zipCode) {
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.identityId = identityId;
        this.licenceId = licenceId;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.city = city;
        this.zipCode = zipCode;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public long getIdentityId() {
        return identityId;
    }

    public void setIdentityId(long identityId) {
        this.identityId = identityId;
    }

    public long getLicenceId() {
        return licenceId;
    }

    public void setLicenceId(long licenceId) {
        this.licenceId = licenceId;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Orders> getOrders() {
        return orders;
    }

    public void setOrders(Set<Orders> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", profilePicture=" + Arrays.toString(profilePicture) +
                ", identityId=" + identityId +
                ", licenceId=" + licenceId +
                ", phoneNumber=" + phoneNumber +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", zipCode=" + zipCode +
                ", roles=" + roles +
                ", orders=" + orders +
                '}';
    }
}
