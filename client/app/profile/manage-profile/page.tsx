'use client';
import React from 'react';
import styles from './profile.module.css';

const ManageProfile: React.FC = () => {
  return (
    <div className={styles.accountWrapper}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
          <div className={styles.avatarEdit}>
            <svg height="20" width="20" viewBox="0 0 20 20" fill="#ff8585">
              <circle cx="10" cy="10" r="10" />
              <path d="M7.5 13.8l6-6c.2-.2.2-.5 0-.7l-1.6-1.6c-.2-.2-.5-.2-.7 0l-6 6V15h1.8zm7.4-8c.3.3.3.8 0 1.1l-.8.8-1.6-1.6.8-.8c.3-.3.8-.3 1.1 0l.5.5z" fill="#fff"/>
            </svg>
          </div>
        </div>
        <div className={styles.avatarInfo}>
          <h2>Alex Johnson</h2>
          <div className={styles.avatarMail}>alex.johnson@email.com</div>
        </div>
      </div>
      <div className={styles.accountBox}>
        <h3>Account</h3>
        <div className={styles.accountFields}>
          <ProfileField label="Name" value="Alex Johnson" canEdit />
          <ProfileField label="Email" value="john.doe@gmail.com" canEdit extra={<button className={styles.secondaryBtn}><span>+</span> Add another email</button>} />
          <ProfileField label="Password" value="*********" canEdit />
          <ProfileField label="Phone number" value="+1 000-000-0000" canEdit />
          <ProfileField label="Address" value="St 32 main downtown, Los Angeles, California, USA" canEdit />
          <ProfileField label="Date of birth" value="01-01-1992" canEdit={false} />
        </div>
      </div>
    </div>
  );
};

const ProfileField: React.FC<{
  label: string,
  value: string,
  canEdit?: boolean,
  extra?: React.ReactNode
}> = ({ label, value, canEdit = false, extra }) => (
  <div className="profileField">
    <div>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {extra}
      {canEdit && (
        <button className="changeBtn">
          <svg height="16" width="16" fill="#3183EF" style={{ marginRight: 5 }} viewBox="0 0 24 24"><path d="M14.06 9.02l.92.92-8.13 8.13H5.93v-1.06l8.13-8.13m3.45-2.66c-.2 0-.51.12-.71.32l-1.13 1.13 1.78 1.77 1.13-1.13c.39-.39.39-1.02 0-1.41l-.37-.36c-.2-.2-.45-.32-.7-.32zm-2.06 2.67L5 17.48V19h1.51l7.5-7.5-1.5-1.51z"/></svg>
          Change
        </button>
      )}
    </div>
    <style jsx>{`
      .profileField {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: transparent;
        padding: 18px 0;
        border-bottom: 1px solid #f2f6fb;
      }
      .label {
        font-size: 14px;
        color: #8c98a4;
      }
      .value {
        font-size: 17px;
        color: #1a232e;
        margin-top: 2px;
      }
      .changeBtn {
        padding: 5px 17px;
        border-radius: 6px;
        border: 1px solid #3183EF;
        background: transparent;
        color: #3183EF;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: background 0.1s;
      }
      .changeBtn:hover {
        background: #f1f6fe;
      }
    `}</style>
  </div>
);

export default ManageProfile;
