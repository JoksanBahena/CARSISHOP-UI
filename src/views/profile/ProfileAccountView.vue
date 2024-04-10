<template>
	<breadcrumbs-component :items="items" />
	<v-container>
		<p class="text-h4 font-weight-medium mb-2">Mi cuenta</p>
		<v-card variant="flat">
			<v-card-item>
				<v-form>
					<v-row>
						<v-col cols="12" lg="4" md="4" class="text-center">
							<v-avatar size="200" :color="colors.primary_dark">
								<v-img
									v-if="state.img"
									:src="state.img"
									alt="profile picture"
								/>
								<v-icon v-else size="80"> mdi-account </v-icon>
							</v-avatar>
						</v-col>
						<v-col cols="12" lg="8" md="8">
							<v-row>
								<v-col cols="12">
									<div
										class="text-subtitle-1 font-weight-medium"
									>
										Foto de perfil
									</div>
									<v-file-input
										density="compact"
										type="file"
										accept="image/png, image/jpeg, image/bmp"
										variant="outlined"
										prepend-icon="mdi-camera-outline"
										chips
										show-size
										@change="onFileChange"
										:readonly="is_disabled"
										v-model="image_url"
										:error-messages="
											v$.img.$errors.map(
												(e) => e.$message
											)
										"
									/>
								</v-col>
								<v-col cols="12" lg="6">
									<div>
										<div
											class="text-subtitle-1 font-weight-medium"
										>
											Nombre(s)
										</div>
										<v-text-field
											density="compact"
											placeholder="Nombre(s)"
											prepend-inner-icon="mdi-account-outline"
											variant="outlined"
											:readonly="is_disabled"
											v-model="state.name"
											@input="v$.name.$touch"
											@blur="v$.name.$touch"
											:error-messages="
												v$.name.$errors.map(
													(e) => e.$message
												)
											"
										/>
									</div>
								</v-col>
								<v-col cols="12" md="6">
									<div
										class="text-subtitle-1 font-weight-medium"
									>
										Apellidos
									</div>
									<v-text-field
										density="compact"
										placeholder="Apellidos"
										prepend-inner-icon="mdi-account-outline"
										variant="outlined"
										:readonly="is_disabled"
										v-model="state.surname"
										@input="v$.surname.$touch"
										@blur="v$.surname.$touch"
										:error-messages="
											v$.surname.$errors.map(
												(e) => e.$message
											)
										"
									/>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="4">
							<div class="text-subtitle-1 font-weight-medium">
								Correo
							</div>
							<v-text-field
								density="compact"
								placeholder="Correo electrónico"
								prepend-inner-icon="mdi-email-outline"
								variant="outlined"
								:readonly="is_disabled"
								v-model="state.email"
								@input="v$.email.$touch"
								@blur="v$.email.$touch"
								:error-messages="
									v$.email.$errors.map((e) => e.$message)
								"
							/>
						</v-col>

						<v-col cols="12" md="4">
							<div class="text-subtitle-1 font-weight-medium">
								Teléfono
							</div>
							<v-text-field
								density="compact"
								placeholder="Teléfono"
								prepend-inner-icon="mdi-phone-outline"
								variant="outlined"
								type="number"
								hide-spin-buttons
								:readonly="is_disabled"
								v-model="state.phone"
								@input="v$.phone.$touch"
								@blur="v$.phone.$touch"
								:error-messages="
									v$.phone.$errors.map((e) => e.$message)
								"
								:counter="10"
							/>
						</v-col>

						<v-col cols="12" md="4">
							<div class="text-subtitle-1 font-weight-medium">
								Género
							</div>
							<v-select
								density="compact"
								placeholder="Género"
								prepend-inner-icon="mdi-account-outline"
								variant="outlined"
								clearable
								chips
								:items="generes"
								:readonly="is_disabled"
								v-model="state.genere"
								@input="v$.genere.$touch"
								@blur="v$.genere.$touch"
								:error-messages="
									v$.genere.$errors.map((e) => e.$message)
								"
							/>
						</v-col>

						<v-divider />

						<v-col v-if="!is_disabled" cols="6">
							<v-btn
								variant="flat"
								prepend-icon="mdi-close-circle-outline"
								class="text-none"
								:color="colors.primary"
								size="large"
								block
								@click="clear()"
							>
								Cancelar
							</v-btn>
						</v-col>
						<v-col :cols="is_disabled ? '12' : '6'">
							<v-btn
								variant="flat"
								append-icon="mdi-check-circle-outline"
								class="text-none"
								:color="colors.primary_dark"
								size="large"
								block
								@click="is_disabled ? onEdit() : submitForm()"
							>
								{{ is_disabled ? 'Editar' : 'Guardar' }}
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-card-item>
		</v-card>
	</v-container>
</template>

<script setup>
import Colors from '@/utils/Colors.js';
import { ref, reactive, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
	required,
	integer,
	minLength,
	maxLength,
	helpers,
} from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { useProfileStore } from '@/store/ProfileStore';

const { withMessage, regex } = helpers;
const { fetchProfile } = useProfileStore();

const colors = {
	primary: Colors.cs_primary,
	primary_dark: Colors.cs_primary_dark,
	white: Colors.cs_white,
};

const items = [
	{
		title: 'Inicio',
		to: { name: 'Home' },
	},
	{
		title: 'Perfil',
		to: { name: 'ProfileSummary' },
	},
	{
		title: 'Mi cuenta',
	},
];

const generes = ['Masculino', 'Femenino', 'Otro'];

const user = {
	name: '',
	surname: '',
	genere: null,
	phone: '',
	email: '',
	img: null,
};
const state = reactive({ ...user });

const getUserInfo = async () => {
	try {
		const response = await fetchProfile();
		console.log(response);
		state.name = response.name;
		state.surname = response.surname;
		state.email = response.username;
		state.phone = response.phone;
		state.genere = response.gender ? response.gender.gender : 'ADMIN';
		state.img = response.profilepic ? response.profilepic : null;
	} catch (err) {
		console.log(err);
	}
};

onMounted(async () => {
	getUserInfo();
});

const rules = {
	name: {
		required: withMessage('El nombre es requerido', required),
		minLength: withMessage(
			'El nombre debe tener al menos 3 caracteres',
			minLength(3)
		),
		maxLength: withMessage(
			'El nombre debe tener menos de 10 caracteres',
			maxLength(50)
		),
		regex: withMessage(
			'El nombre solo puede contener letras, acentos, espacios y dierecis',
			regex(/^[a-zA-ZÀ-ÿ\s]+$/)
		),
	},
	surname: {
		required: withMessage('El apellido es requerido', required),
		minLength: withMessage(
			'El apellido debe tener al menos 3 caracteres',
			minLength(3)
		),
		maxLength: withMessage(
			'El apellido debe tener menos de 10 caracteres',
			maxLength(50)
		),
		regex: withMessage(
			'El apellido solo puede contener letras, acentos, espacios y dierecis',
			regex(/^[a-zA-ZÀ-ÿ\s]+$/)
		),
	},
	genere: {
		required: withMessage('El genero es requerido', required),
	},
	phone: {
		required: withMessage('El teléfono es requerido', required),
		integer: withMessage('El teléfono debe ser un número', integer),
		regex: withMessage(
			'El teléfono solo debe contener números',
			regex(/^\d+$/)
		),
		minLength: withMessage(
			'El teléfono debe tener al menos 10 caracteres',
			minLength(10)
		),
		maxLength: withMessage(
			'El teléfono debe tener menos de 10 caracteres',
			maxLength(10)
		),
	},
	email: {
		required: withMessage('El correo es requerido', required),
		email: withMessage('El correo no es válido', regex(/^.+@.+\..+$/)),
	},
	img: {
		required: withMessage('La imagen es requerida', required),
	},
};

const v$ = useVuelidate(rules, state);

const is_disabled = ref(true);

const onEdit = () => {
	is_disabled.value = false;
};

const submitForm = () => {
	v$.value.$touch();
	if (v$.value.$error) {
		return;
	} else {
		alert(JSON.stringify(state));
		is_disabled.value = true;
	}
};

const clear = () => {
	is_disabled.value = true;
	v$.value.$reset();

	for (const [key, value] of Object.entries(user)) {
		state[key] = value;
	}

	getUserInfo();
};

const image_url = ref('');

const onFileChange = (e) => {
	const file = e.target.files[0];
	const reader = new FileReader();

	reader.onload = (e) => {
		if (file.size > 2_000_000) {
			state.img = null;
			Swal.fire({
				title: 'Error!',
				text: 'La imagen no debe pesar más de 2MB',
				icon: 'error',
				confirmButtonText: 'Ok',
			});
			return;
		}
		image_url.value = e.target.result;
	};
	reader.readAsDataURL(file);
};
</script>
