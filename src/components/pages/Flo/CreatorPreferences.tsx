import { Button, Select } from '@/components/ui'
import { ageRanges, countryOptions, genderOptions } from '@/mock/data/commonData'
import { useFloStore } from '@/store/floStore'

const Label = ({ title }: { title: string }) => {
	return <label className="block text-lg font-medium mb-1">{title}</label>
}

export function CreatorPreferences() {
	const { formData, setCreatorPreference, errors: errorFromStore } = useFloStore()
	const ageRangeState = formData?.creatorPreferences?.ageRange
	const errors = {
		gender: errorFromStore['creatorPreferences.gender'],
		ageRange: errorFromStore['creatorPreferences.ageRange'],
		country: errorFromStore['creatorPreferences.country'],
		otherPreferences: errorFromStore['creatorPreferences.otherPreferences'],
	}
	return (
		<div className="grid gap-4">
			<div>
				<Label title="Model Gender" />
				<Select
					placeholder="Model Gender"
					options={genderOptions}
					onChange={e => setCreatorPreference('gender', String(e?.label))}
				/>
				{errors?.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
			</div>

			<div>
				<Label title="Age Range" />
				<div className="flex gap-4">
					{ageRanges.map(age => {
						return (
							<Button
								key={age}
								className={`px-4 py-2 border rounded-md hover:bg-gray-50`}
								variant={ageRangeState === age ? 'solid' : 'default'}
								onClick={() => {
									setCreatorPreference('ageRange', age)
								}}
							>
								{age}
							</Button>
						)
					})}
				</div>
				{errors?.ageRange && <p className="text-red-500 text-sm mt-1">{errors.ageRange}</p>}
			</div>

			<div>
				<Label title="Country/Region" />
				<Select
					placeholder="Model Country"
					options={countryOptions}
					onChange={e => setCreatorPreference('country', String(e?.label))}
				/>
				{errors?.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
			</div>

			<div>
				<Label title="Country/Region" />
				<textarea
					placeholder=" Looking for a specific type of creator? (e.g. creators with pets)"
					className="border-white w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg"
					onChange={e => setCreatorPreference('otherPreferences', e.target.value)}
				/>
			</div>
		</div>
	)
}
