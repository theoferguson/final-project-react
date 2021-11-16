import { useState } from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react'


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
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>
                    Name:
                    <input type="text" name="name" value={settings.name ? settings.name : user.name} onChange={handleChange} />
                </label>
                </Form.Field>
                <Form.Field>
                <label>
                    Email:
                    <input type="text" name="email" value={settings.email ? settings.email : user.email} onChange={handleChange} />
                </label>
                </Form.Field>
                <Form.Field>
                <label>
                    Profile Picture:
                    <input type="text" name="picture" value={settings.picture ? settings.picture : user.picture} onChange={handleChange} />
                </label>
                </Form.Field>
                <Form.Field>
                <label>
                    Company:
                    <input type="text" name="company" value={settings.company ? settings.company : user.company} onChange={handleChange} />
                </label>
                </Form.Field>
                <Form.Field>
                <label>
                    Capacity Provider?:
                    <Checkbox name="capacity_provider" value={user.capacity_provider ? user.capacity_provider : user.capacity_provider} onChange={handleChange} />
                </label>
                </Form.Field>
                <Form.Field>
                <label>
                    Main Location:
                    <input type="text" name="location" value={settings.location ? settings.location : user.location} onChange={handleChange} />
                </label>
                </Form.Field>
                <Form.Field>
                <label>
                    Main Industry:
                    <input type="text" name="industry" value={settings.industry ? settings.industry : user.industry} onChange={handleChange} />
                </label>
                </Form.Field>
                <Button disabled={settings === {} ? false : true} basic fluid color='teal' type="submit">Save Settings</Button>
            </Form>
    )

};

export default Settings;