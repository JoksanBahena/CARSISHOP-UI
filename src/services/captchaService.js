import axios from 'axios';

const API_URL = 'http://localhost:8080/api/captcha/';

const CaptchaSolution = {
    verificarCaptcha(solution) {
        return axios.post(API_URL + "?solution=" + solution)
            .then(response => response.data)
            .catch(error => {
                console.error('Error al verificar el captcha:', error);
                throw error;
            });
    }
};

export default CaptchaSolution;