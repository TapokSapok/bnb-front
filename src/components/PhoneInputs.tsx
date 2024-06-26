import { useContext, useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import { IUserData, UserContext } from '../App';
import InputMask from 'react-input-mask';

const PhoneInputs = ({ errorMessage, setErrorMessage }: { errorMessage: string; setErrorMessage: (v: string) => void }) => {
	const [focusedPhone, setFocusedPhone] = useState(false);
	const [focusedCode, setFocusedCode] = useState(false);
	const [inputError] = useState(false);
	const [phone, setPhone] = useState('');
	const { setUser } = useContext(UserContext);
	const [region, setRegion] = useState('1US');
	const [countryCode, setCountryCode] = useState('1');

	useEffect(() => setCountryCode(region.replace(/\D/g, '')), [region]);
	useEffect(() => {
		setUser((u: IUserData) => ({ ...u, phone: `${countryCode}_${phone.replace(/ |-/g, '')}` }));
	}, [phone]);

	return (
		<>
			<div
				className={styles.input_box}
				onBlur={() => setFocusedCode(false)}
				onFocus={() => setFocusedCode(true)}
				style={
					focusedCode
						? { boxShadow: `inset 0 0 0 2px ${inputError ? '#C13515' : '#222222'}`, marginBottom: '8px' }
						: inputError
						? {
								boxShadow: `inset 0 0 0 1px #C13515`,
								background: '#FFF8F6',
								marginBottom: '8px',
						  }
						: { marginBottom: '8px' }
				}
			>
				<label>
					<div
						className={styles.label_title}
						style={{
							transform: 'translateY(-10px) scale(0.75)',
							left: '0px',
							height: '15px',
						}}
					>
						Country code
					</div>
					<div className={styles.input_wrapper} style={{ opacity: '1' }}>
						<select value={region} onChange={e => setRegion(e.target.value)}>
							<option value='93AF'>Afghanistan (+93)</option>
							<option value='358AX'>Åland Islands (+358)</option>
							<option value='355AL'>Albania (+355)</option>
							<option value='213DZ'>Algeria (+213)</option>
							<option value='1AS'>American Samoa (+1)</option>
							<option value='376AD'>Andorra (+376)</option>
							<option value='244AO'>Angola (+244)</option>
							<option value='1AI'>Anguilla (+1)</option>
							<option value='1AG'>Antigua &amp; Barbuda (+1)</option>
							<option value='54AR'>Argentina (+54)</option>
							<option value='374AM'>Armenia (+374)</option>
							<option value='297AW'>Aruba (+297)</option>
							<option value='61AU'>Australia (+61)</option>
							<option value='43AT'>Austria (+43)</option>
							<option value='994AZ'>Azerbaijan (+994)</option>
							<option value='1BS'>Bahamas (+1)</option>
							<option value='973BH'>Bahrain (+973)</option>
							<option value='880BD'>Bangladesh (+880)</option>
							<option value='1BB'>Barbados (+1)</option>
							<option value='375BY'>Belarus (+375)</option>
							<option value='32BE'>Belgium (+32)</option>
							<option value='501BZ'>Belize (+501)</option>
							<option value='229BJ'>Benin (+229)</option>
							<option value='1BM'>Bermuda (+1)</option>
							<option value='975BT'>Bhutan (+975)</option>
							<option value='591BO'>Bolivia (+591)</option>
							<option value='599BQ'>Bonaire, Sint Eustatius and Saba (+599)</option>
							<option value='387BA'>Bosnia &amp; Herzegovina (+387)</option>
							<option value='267BW'>Botswana (+267)</option>
							<option value='55BR'>Brazil (+55)</option>
							<option value='246IO'>British Indian Ocean Territory (+246)</option>
							<option value='1VG'>British Virgin Islands (+1)</option>
							<option value='673BN'>Brunei (+673)</option>
							<option value='359BG'>Bulgaria (+359)</option>
							<option value='226BF'>Burkina Faso (+226)</option>
							<option value='257BI'>Burundi (+257)</option>
							<option value='855KH'>Cambodia (+855)</option>
							<option value='237CM'>Cameroon (+237)</option>
							<option value='1CA'>Canada (+1)</option>
							<option value='238CV'>Cape Verde (+238)</option>
							<option value='1KY'>Cayman Islands (+1)</option>
							<option value='236CF'>Central African Republic (+236)</option>
							<option value='235TD'>Chad (+235)</option>
							<option value='56CL'>Chile (+56)</option>
							<option value='86CN'>China (+86)</option>
							<option value='61CX'>Christmas Island (+61)</option>
							<option value='61CC'>Cocos (Keeling) Islands (+61)</option>
							<option value='57CO'>Colombia (+57)</option>
							<option value='269KM'>Comoros (+269)</option>
							<option value='242CG'>Congo (+242)</option>
							<option value='682CK'>Cook Islands (+682)</option>
							<option value='506CR'>Costa Rica (+506)</option>
							<option value='225CI'>Côte d’Ivoire (+225)</option>
							<option value='385HR'>Croatia (+385)</option>
							<option value='53CU'>Cuba (+53)</option>
							<option value='599CW'>Curaçao (+599)</option>
							<option value='357CY'>Cyprus (+357)</option>
							<option value='420CZ'>Czechia (+420)</option>
							<option value='243CD'>Democratic Republic of the Congo (+243)</option>
							<option value='45DK'>Denmark (+45)</option>
							<option value='253DJ'>Djibouti (+253)</option>
							<option value='1DM'>Dominica (+1)</option>
							<option value='1DO'>Dominican Republic (+1)</option>
							<option value='593EC'>Ecuador (+593)</option>
							<option value='20EG'>Egypt (+20)</option>
							<option value='503SV'>El Salvador (+503)</option>
							<option value='240GQ'>Equatorial Guinea (+240)</option>
							<option value='291ER'>Eritrea (+291)</option>
							<option value='372EE'>Estonia (+372)</option>
							<option value='268SZ'>Eswatini (+268)</option>
							<option value='251ET'>Ethiopia (+251)</option>
							<option value='500FK'>Falkland Islands (Islas Malvinas) (+500)</option>
							<option value='298FO'>Faroe Islands (+298)</option>
							<option value='679FJ'>Fiji (+679)</option>
							<option value='358FI'>Finland (+358)</option>
							<option value='33FR'>France (+33)</option>
							<option value='594GF'>French Guiana (+594)</option>
							<option value='689PF'>French Polynesia (+689)</option>
							<option value='241GA'>Gabon (+241)</option>
							<option value='220GM'>Gambia (+220)</option>
							<option value='995GE'>Georgia (+995)</option>
							<option value='49DE'>Germany (+49)</option>
							<option value='233GH'>Ghana (+233)</option>
							<option value='350GI'>Gibraltar (+350)</option>
							<option value='30GR'>Greece (+30)</option>
							<option value='299GL'>Greenland (+299)</option>
							<option value='1GD'>Grenada (+1)</option>
							<option value='590GP'>Guadeloupe (+590)</option>
							<option value='1GU'>Guam (+1)</option>
							<option value='502GT'>Guatemala (+502)</option>
							<option value='44GG'>Guernsey (+44)</option>
							<option value='224GN'>Guinea (+224)</option>
							<option value='245GW'>Guinea-Bissau (+245)</option>
							<option value='592GY'>Guyana (+592)</option>
							<option value='509HT'>Haiti (+509)</option>
							<option value='504HN'>Honduras (+504)</option>
							<option value='852HK'>Hong Kong (+852)</option>
							<option value='36HU'>Hungary (+36)</option>
							<option value='354IS'>Iceland (+354)</option>
							<option value='91IN'>India (+91)</option>
							<option value='62ID'>Indonesia (+62)</option>
							<option value='964IQ'>Iraq (+964)</option>
							<option value='353IE'>Ireland (+353)</option>
							<option value='44IM'>Isle of Man (+44)</option>
							<option value='972IL'>Israel (+972)</option>
							<option value='39IT'>Italy (+39)</option>
							<option value='1JM'>Jamaica (+1)</option>
							<option value='81JP'>Japan (+81)</option>
							<option value='44JE'>Jersey (+44)</option>
							<option value='962JO'>Jordan (+962)</option>
							<option value='7KZ'>Kazakhstan (+7)</option>
							<option value='254KE'>Kenya (+254)</option>
							<option value='686KI'>Kiribati (+686)</option>
							<option value='383XK'>Kosovo (+383)</option>
							<option value='965KW'>Kuwait (+965)</option>
							<option value='996KG'>Kyrgyzstan (+996)</option>
							<option value='856LA'>Laos (+856)</option>
							<option value='371LV'>Latvia (+371)</option>
							<option value='961LB'>Lebanon (+961)</option>
							<option value='266LS'>Lesotho (+266)</option>
							<option value='231LR'>Liberia (+231)</option>
							<option value='218LY'>Libya (+218)</option>
							<option value='423LI'>Liechtenstein (+423)</option>
							<option value='370LT'>Lithuania (+370)</option>
							<option value='352LU'>Luxembourg (+352)</option>
							<option value='853MO'>Macau (+853)</option>
							<option value='389MK'>North Macedonia (+389)</option>
							<option value='261MG'>Madagascar (+261)</option>
							<option value='265MW'>Malawi (+265)</option>
							<option value='60MY'>Malaysia (+60)</option>
							<option value='960MV'>Maldives (+960)</option>
							<option value='223ML'>Mali (+223)</option>
							<option value='356MT'>Malta (+356)</option>
							<option value='692MH'>Marshall Islands (+692)</option>
							<option value='596MQ'>Martinique (+596)</option>
							<option value='222MR'>Mauritania (+222)</option>
							<option value='230MU'>Mauritius (+230)</option>
							<option value='262YT'>Mayotte (+262)</option>
							<option value='52MX'>Mexico (+52)</option>
							<option value='691FM'>Micronesia (+691)</option>
							<option value='373MD'>Moldova (+373)</option>
							<option value='377MC'>Monaco (+377)</option>
							<option value='976MN'>Mongolia (+976)</option>
							<option value='382ME'>Montenegro (+382)</option>
							<option value='1MS'>Montserrat (+1)</option>
							<option value='212MA'>Morocco (+212)</option>
							<option value='258MZ'>Mozambique (+258)</option>
							<option value='95MM'>Myanmar (+95)</option>
							<option value='264NA'>Namibia (+264)</option>
							<option value='674NR'>Nauru (+674)</option>
							<option value='977NP'>Nepal (+977)</option>
							<option value='31NL'>Netherlands (+31)</option>
							<option value='687NC'>New Caledonia (+687)</option>
							<option value='64NZ'>New Zealand (+64)</option>
							<option value='505NI'>Nicaragua (+505)</option>
							<option value='227NE'>Niger (+227)</option>
							<option value='234NG'>Nigeria (+234)</option>
							<option value='683NU'>Niue (+683)</option>
							<option value='672NF'>Norfolk Island (+672)</option>
							<option value='1MP'>Northern Mariana Islands (+1)</option>
							<option value='47NO'>Norway (+47)</option>
							<option value='968OM'>Oman (+968)</option>
							<option value='92PK'>Pakistan (+92)</option>
							<option value='680PW'>Palau (+680)</option>
							<option value='970PS'>Palestinian Territories (+970)</option>
							<option value='507PA'>Panama (+507)</option>
							<option value='675PG'>Papua New Guinea (+675)</option>
							<option value='595PY'>Paraguay (+595)</option>
							<option value='51PE'>Peru (+51)</option>
							<option value='63PH'>Philippines (+63)</option>
							<option value='64PN'>Pitcairn Islands (+64)</option>
							<option value='48PL'>Poland (+48)</option>
							<option value='351PT'>Portugal (+351)</option>
							<option value='1PR'>Puerto Rico (+1)</option>
							<option value='974QA'>Qatar (+974)</option>
							<option value='262RE'>Réunion (+262)</option>
							<option value='40RO'>Romania (+40)</option>
							<option value='7RU'>Russia (+7)</option>
							<option value='250RW'>Rwanda (+250)</option>
							<option value='685WS'>Samoa (+685)</option>
							<option value='378SM'>San Marino (+378)</option>
							<option value='239ST'>São Tomé &amp; Príncipe (+239)</option>
							<option value='966SA'>Saudi Arabia (+966)</option>
							<option value='221SN'>Senegal (+221)</option>
							<option value='381RS'>Serbia (+381)</option>
							<option value='248SC'>Seychelles (+248)</option>
							<option value='232SL'>Sierra Leone (+232)</option>
							<option value='65SG'>Singapore (+65)</option>
							<option value='1SX'>Sint Maarten (+1)</option>
							<option value='421SK'>Slovakia (+421)</option>
							<option value='386SI'>Slovenia (+386)</option>
							<option value='677SB'>Solomon Islands (+677)</option>
							<option value='252SO'>Somalia (+252)</option>
							<option value='27ZA'>South Africa (+27)</option>
							<option value='500GS'>South Georgia &amp; South Sandwich Islands (+500)</option>
							<option value='82KR'>South Korea (+82)</option>
							<option value='211SS'>South Sudan (+211)</option>
							<option value='34ES'>Spain (+34)</option>
							<option value='94LK'>Sri Lanka (+94)</option>
							<option value='590BL'>St. Barthélemy (+590)</option>
							<option value='290SH'>St. Helena (+290)</option>
							<option value='1KN'>St. Kitts &amp; Nevis (+1)</option>
							<option value='1LC'>St. Lucia (+1)</option>
							<option value='590MF'>St. Martin (+590)</option>
							<option value='508PM'>St. Pierre &amp; Miquelon (+508)</option>
							<option value='1VC'>St. Vincent &amp; Grenadines (+1)</option>
							<option value='249SD'>Sudan (+249)</option>
							<option value='597SR'>Suriname (+597)</option>
							<option value='47SJ'>Svalbard &amp; Jan Mayen (+47)</option>
							<option value='46SE'>Sweden (+46)</option>
							<option value='41CH'>Switzerland (+41)</option>
							<option value='886TW'>Taiwan (+886)</option>
							<option value='992TJ'>Tajikistan (+992)</option>
							<option value='255TZ'>Tanzania (+255)</option>
							<option value='66TH'>Thailand (+66)</option>
							<option value='670TL'>Timor-Leste (+670)</option>
							<option value='228TG'>Togo (+228)</option>
							<option value='690TK'>Tokelau (+690)</option>
							<option value='676TO'>Tonga (+676)</option>
							<option value='1TT'>Trinidad &amp; Tobago (+1)</option>
							<option value='216TN'>Tunisia (+216)</option>
							<option value='90TR'>Turkey (+90)</option>
							<option value='993TM'>Turkmenistan (+993)</option>
							<option value='1TC'>Turks &amp; Caicos Islands (+1)</option>
							<option value='688TV'>Tuvalu (+688)</option>
							<option value='1VI'>U.S. Virgin Islands (+1)</option>
							<option value='256UG'>Uganda (+256)</option>
							<option value='380UA'>Ukraine (+380)</option>
							<option value='971AE'>United Arab Emirates (+971)</option>
							<option value='44GB'>United Kingdom (+44)</option>
							<option value='1US'>United States (+1)</option>
							<option value='598UY'>Uruguay (+598)</option>
							<option value='998UZ'>Uzbekistan (+998)</option>
							<option value='678VU'>Vanuatu (+678)</option>
							<option value='379VA'>Vatican City (+379)</option>
							<option value='58VE'>Venezuela (+58)</option>
							<option value='84VN'>Vietnam (+84)</option>
							<option value='681WF'>Wallis &amp; Futuna (+681)</option>
							<option value='212EH'>Western Sahara (+212)</option>
							<option value='967YE'>Yemen (+967)</option>
							<option value='260ZM'>Zambia (+260)</option>
							<option value='263ZW'>Zimbabwe (+263)</option>
						</select>
					</div>
				</label>
			</div>

			<div
				className={styles.input_box}
				onBlur={() => setFocusedPhone(false)}
				onFocus={() => setFocusedPhone(true)}
				style={
					focusedPhone
						? { boxShadow: `inset 0 0 0 2px ${errorMessage ? '#C13515' : '#222222'}` }
						: errorMessage
						? {
								boxShadow: `inset 0 0 0 1px #C13515`,
								background: '#FFF8F6',
						  }
						: {}
				}
			>
				<label>
					<div
						className={styles.label_title}
						style={
							focusedPhone || phone.length
								? {
										transform: 'translateY(-10px) scale(0.75)',
										left: '0px',
										height: '15px',
										fontWeight: errorMessage ? '700' : '',
										color: errorMessage ? '#C13515' : '',
								  }
								: {}
						}
					>
						Phone number
					</div>
					<div className={styles.input_wrapper} style={focusedPhone || phone.length ? { opacity: '1' } : {}}>
						<div className={styles.number_code} style={focusedPhone || phone.length ? { opacity: '1', color: phone.length ? '#222222' : '#717171' } : {}}>
							+{countryCode}
						</div>
						<InputMask
							data-phone
							placeholder='XXX XXX-XX-XX'
							mask='999 999-99-99'
							maskPlaceholder=''
							value={phone}
							onChange={e => {
								setPhone(e.target.value);
								setErrorMessage('');
							}}
							style={phone.length && errorMessage && !focusedPhone ? { background: '#FFF8F6' } : {}}
						/>
					</div>
				</label>
			</div>
			{errorMessage ? (
				<div className={styles.error_message}>
					<img src='../../error.svg' alt='' width={12} />
					{errorMessage}
				</div>
			) : (
				<span className={styles.desc} data-phone>
					We’ll call or text you to confirm your number. Standard message and data rates apply. <a href='https://google.com'>Privacy Policy</a>
				</span>
			)}
		</>
	);
};

export default PhoneInputs;
