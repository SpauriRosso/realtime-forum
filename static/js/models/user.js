export class User {
  async init() {
    const session_uuid = localStorage.getItem('session_uuid');
    if (!session_uuid) {
      this.isConnected = false;
      return;
    }

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_uuid }),
      });
      const result = await res.json();

      if (result.code !== 200 || !result.data?.user) {
        this.isConnected = false;
        localStorage.removeItem('session_uuid');
        return;
      }
      const resUser = result.data.user;
      this.uuid = resUser.uuid;
      this.nickname = resUser.nickname;
      this.age = resUser.age;
      this.gender = resUser.gender;
      this.firstName = resUser.firstName;
      this.lastName = resUser.lastName;
      this.email = resUser.email;
      this.isConnected = true;
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'utilisateur :", error);
    }
  }

  static async createInstance() {
    const user = new User();
    await user.init();
    return user;
  }
}
