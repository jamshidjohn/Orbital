import { Form, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../apicalls/users';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onFinish = async values => {
		try {
			dispatch(ShowLoading());
			const response = await registerUser(values);
			dispatch(HideLoading());
			if (response.success) {
				message.success(response.message);
				navigate('/login');
			} else {
				message.error(response.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};
	return (
		<div className='flex justify-center items-center h-screen w-screen bg-primary'>
			<div className='card w-400 p-3 bg-white'>
				<div className='flex flex-col'>
					<h1 className='text-2xl'>
						Ro'yxatdan o'tish <i class='ri-user-add-line'></i>
					</h1>
					<div className='divider'></div>
					<Form layout='vertical' className='mt-2' onFinish={onFinish}>
						<Form.Item name='name' label='Ismingizni yozing'>
							<input type='text' />
						</Form.Item>
						<Form.Item name='email' label='Emailingizni kiriting'>
							<input type='text' />
						</Form.Item>
						<Form.Item name='password' label='Parolingizni kiriting'>
							<input type='password' />
						</Form.Item>

						<div className='flex flex-col gap-2'>
							<button type='submit' className='primary-contained-btn mt-2 w-100'>
								Ro'yxatdan o'tish
							</button>
							<Link to='/login'>Allaqachon hisobingiz mavjudmi? Kirish</Link>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Register;
