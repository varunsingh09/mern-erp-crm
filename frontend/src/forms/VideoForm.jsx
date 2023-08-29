import { Form, Input, Select } from 'antd';
import { RadioGroup, UploadFile } from '@/components/CustomAntd';

export default function VideoForm({ isUpdateForm = false, setSelectedFile }) {
    return (
        <>
            <Form.Item
                label="File Name"
                name="file_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input file name!',
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
                name="file_type"
                label="File Type"
                rules={[
                    {
                        required: true,
                    },
                ]}

            >
                <Select showSearch={true}>
                    {[{ id: 0, value: "mp4" }, { id: 1, value: "flv" }, { id: 2, value: "hls" }]?.map((list) => <Select.Option value={list.value} key={list.id}>{list.value}</Select.Option>)}
                </Select>
            </Form.Item>
            <br />
            <UploadFile path={`employee/photo`} setSelectedFile={setSelectedFile} type={`video`} />
            <br />
            <RadioGroup />
            <br />
            <br />
        </>
    );
}
