import { useState, useEffect } from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react'


function Settings({ user, setUser }) {
    const [settings, setSettings] = useState({});
    const [checked, setChecked] = useState(false)

    function handleChange(event) {
        console.log(checked)
        if (event === "capacity_provider") {
            setSettings({ ...settings, capacity_provider: checked })
        } else {
            setSettings({ ...settings, [event.target.name]: event.target.value })
        }
    };

    function toggle() {
        setChecked(!checked)
        handleChange("capacity_provider")
    };

    // for testing:
    useEffect(() => {
        console.log(settings);
    }, [settings]);

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
                    <input type="text" name="name" value={settings.name || user.name || ''} onChange={handleChange} />
                </label>
            </Form.Field>
            <Form.Field>
                <label>
                    Email:
                    <input type="text" name="email" value={settings.email || user.email || ''} onChange={handleChange} />
                </label>
            </Form.Field>
            {/* <Form.Field>
                <label>
                    Profile Picture:
                    <input type="text" name="picture" value={settings.picture || user.picture || ''} onChange={handleChange} />
                </label>
                </Form.Field> */}
            <Form.Field>
                <label>
                    Company:
                    <input type="text" name="company" value={settings.company || user.company || ''} onChange={handleChange} />
                </label>
            </Form.Field>
            <Form.Field>
                <Checkbox label='Capacity provider?' name="capacity_provider" onChange={toggle} checked={!checked} />
            </Form.Field>
            <Form.Field>
                <label>
                    Main Location:
                    <input type="text" name="location" value={settings.location || user.location || ''} onChange={handleChange} />
                </label>
            </Form.Field>
            <Form.Field>
                <label>
                    Main Industry:
                    <input type="text" name="industry" value={settings.industry || user.industry || ''} onChange={handleChange} />
                </label>
            </Form.Field>
            <Button disabled={Object.keys(settings).length !== 0 ? false : true} basic fluid color='teal' type="submit">Save Settings</Button>
        </Form>
    )

};

export default Settings;