import { PCA } from "https://raw.githubusercontent.com/gnlow/deno-pca/master/mod.ts"
import { NumericalTuple } from "https://raw.githubusercontent.com/randkid/Randkid/master/mod.ts"
import birthdate from "https://raw.githubusercontent.com/randkid/birthdate/master/mod.ts"
import { gaussian } from "https://deno.land/x/gaussian/mod.ts"
import { hash } from "https://raw.githubusercontent.com/gnlow/planter/master/mod.ts"
import f from "./src/f_model.js"
import m from "./src/m_model.js"

const a = new NumericalTuple({
    inputMaterials: [birthdate],
    ranges: [],
    rand(seed, birthDateVal) {
        const date = new Date(birthDateVal)
        const pca = PCA.load(f[2013 - date.getFullYear()].model)
        const randomized = pca.getStandardDeviations().splice(0, 5)
            .map((σ: number, i: number) => 
                gaussian(0, σ**2).ppf(hash(seed, i))
            )
        return Array.from(pca.invert([randomized]).data[0]) as number[]
    }
})
console.log(new Date(birthdate.rand(0)), a.rand(0))