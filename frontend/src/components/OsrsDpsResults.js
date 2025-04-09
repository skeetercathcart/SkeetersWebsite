import '../css/runescapecalc.css'




const OsrsDpsResults = () => {
    return (
        <div class = 'results-container'> 
            <table class = 'results-table'>
                <th colspan = '2' className = "results-header">
                    Results
                </th>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> Max Hit </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Expected Hit </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
                <tr>
                    <td className = "results-cat-cell"> DPS </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Avg. TTK </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> Accuracy </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
                <th colspan = '2' className = "results-header">
                    Rolls
                </th>
                <tr className = "results-row"> 
                    <td className = "results-cat-cell"> Attack Roll </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
                <tr className = "results-row">
                    <td className = "results-cat-cell"> NPC Def Roll </td>
                    <td className = "results-cell"> 44 </td>
                </tr>
            </table>
        </div>
    )
}

export default OsrsDpsResults 