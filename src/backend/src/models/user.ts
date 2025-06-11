import { Database } from 'sqlite';
import bcrypt from 'bcrypt';

class User {
    /*------------------------------SEARCH USER-----------------------------*/
    
    static async findAll(db: Database) {
        return db.all('SELECT * FROM users');
    }

    static async findById(db: Database, id: number) {
        return db.get('SELECT * FROM users WHERE id = ?', id);
    }

    static async findByGoogleId(db: Database, googleId: string) {
        return db.get('SELECT * FROM users WHERE google_id = ?', googleId);
    }

    static async findByUsername(db: Database, username: string) {
        return db.get('SELECT * FROM users WHERE username = ?', username);
    }

    static async findByEmail(db: Database, email: string) {
        return db.get('SELECT * FROM users WHERE email = ?', email);
    }

    /*------------------------------CREATE USER-----------------------------*/

    static async create(
        db: Database, 
        { username, email, password, google_id }: { username: string; email: string; password?: string; google_id?: string | null }
    ) {
        const existingUser = await db.get('SELECT username FROM users WHERE username = ?', username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
    
        const existingEmail = await this.findByEmail(db, email);
        if (existingEmail) {
            throw new Error('Email already exists');
        }
    
        let hashedPassword: string | null = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
    
        return db.run(
            'INSERT INTO users (username, password, email, google_id, created_at) VALUES (?, ?, ?, ?, ?)',
            username, hashedPassword, email, google_id || null, new Date().toISOString()
        );
    }

    /*----------------------------2FA PREFERENCES---------------------------*/

    static async getPreferred2FAMethod(db: Database, id: number) {
        const result = await db.get('SELECT otp_option FROM users WHERE id = ?', [id]);
        if (!result.otp_option)
            return null;
        return result.otp_option;
    }

    static async updateOtpOption(db: Database, id: number, otp_option: string, otp_contact?: string | null) {
        const user = await this.findById(db, id);
        if (!user) {
            throw new Error('No user with this ID');
        }
        
        const validMethods = ['sms', 'email', 'app'];
        if (!validMethods.includes(otp_option)) {
            throw new Error('Invalid 2FA method');
        }

        if ((otp_option === 'sms' || otp_option === 'email') && !otp_contact) {
            throw new Error('Contact information required for SMS and email 2FA');
        }

        return db.run(
            'UPDATE users SET otp_option = ?, otp_contact = ? WHERE id = ?',
            otp_option,
            otp_option === 'sms' || otp_option === 'email' ? otp_contact : null,
            id
        );
    }

    /*------------------------------UPDATE USER TO BE REMOVED-----------------------------*/
    static async update(db: Database, id: number, { username, email }: { username?: string; email?: string }) 
    {
        const updateFields = [];
        const params = [];
        
        if (username !== undefined) {
            updateFields.push('username = ?');
            params.push(username);
        }
        
        if (email !== undefined) {
            updateFields.push('email = ?');
            params.push(email);
        }
        
        if (updateFields.length === 0) {
            const user = await this.findById(db, id);
            return user;
        }
        
        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        params.push(id);
        
        await db.run(query, params);
        
        return await this.findById(db, id);
    }
    
    /*------------------------------UPDATE USER-----------------------------*/

    static async updateGoogleId(db: Database, id: number, googleId: string) {
        await db.run('UPDATE users SET google_id = ? WHERE id = ?', [googleId, id]);
        return { id, googleId };
    }

    static async updateUsername(db: Database, id: number, username: string) {
        await db.run('UPDATE users SET name = ? WHERE id = ?', [username, id]);
        return { id, username };
    }

    static async updateEmail(db: Database, id: number, email: string) {
        await db.run('UPDATE users SET email = ? WHERE id = ?', [email, id]);
        return { id, email };
    }

    static async updatePassword(db: Database, id: number, password: string) {
        await db.run('UPDATE users SET password = ? WHERE id = ?', [password, id]);
        return { id };
    }

    static async getOtpSecret(db: Database, id: number) {
        const row = await db.get('SELECT otp_secret, otp_auth_url FROM users WHERE id = ?', [id]);
        if (!row || !row.otp_secret) {
            return null;
        }
        return row.otp_secret;
    }

    static async getOtpAuthUrl(db: Database, id: number) {
        const row = await db.get('SELECT otp_secret, otp_auth_url FROM users WHERE id = ?', [id]);
        if (!row || !row.otp_auth_url) {
            return null;
        }
        return row.otp_auth_url;
    }

    static async setOtpSecret(db: Database, id: number, otpSecret: string, otpAuthUrl: string) {
        await db.run('UPDATE users SET otp_secret = ?, otp_auth_url = ? WHERE id = ?', [otpSecret, otpAuthUrl, id]);
        return { id, otpSecret, otpAuthUrl };
    }

    static async setOtpVerified(db: Database, id: number, otpVerified: boolean) {
        await db.run('UPDATE users SET otp_verified = ? WHERE id = ?', [otpVerified, id]);
        return { id, otpVerified };
    }

    /*------------------------------DELETE USER-----------------------------*/

    static async delete(db: Database, id: number) {
        await db.run('DELETE FROM users WHERE id = ?', id);
    }
}

export default User;