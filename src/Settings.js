import { useState } from 'react';

function Settings({ user, setUser }) {
    const [settings, setSettings] = useState({});

    function handleChange(event) {
        if (event.target.name === "capacity_provider") {
            setSettings({ ...settings, [event.target.name]: event.target.checked })
        } else {
            setSettings({ ...settings, [event.target.name]: event.target.value })
        }
    };

    // for testing:
    // useEffect(() => {
    //     console.log(settings);
    // }, [settings]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                settings
            ),
        })
        .then((r) => r.json())
        .then((json) => {
            console.log(json)
            setUser(json)
            setSettings({})
        })
    };


    return (
        <div className="settings" >
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={settings.name ? settings.name : ""} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={settings.email ? settings.email : ""} onChange={handleChange} />
                </label>
                <label>
                    Profile Picture:
                    <input type="text" name="picture" value={settings.picture ? settings.picture : ""} onChange={handleChange} />
                </label>
                <label>
                    Company:
                    <input type="text" name="company" value={settings.company ? settings.company : ""} onChange={handleChange} />
                </label>
                <label>
                    Capacity Provider?:
                    <input type="checkbox" name="capacity_provider" value={user.capacity_provider ? user.capacity_provider : ""} onChange={handleChange} />
                </label>
                <label>
                    Main Location:
                    <input type="text" name="location" value={settings.location ? settings.location : ""} onChange={handleChange} />
                </label>
                <label>
                    Main Industry:
                    <input type="text" name="industry" value={settings.industry ? settings.industry : ""} onChange={handleChange} />
                </label>

                <input type="submit" value="Save Settings" />
            </form>
        </div>
    )

};

export default Settings;